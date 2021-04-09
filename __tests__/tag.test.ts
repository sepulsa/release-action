import {exec, ExecOptions} from '@actions/exec'
import {prereleaseTag, releaseTag} from '../src/tag'

jest.mock('@actions/exec')

test('Prerelease tag', async () => {
  const mockedExec = exec as jest.Mock<Promise<number>>
  mockedExec.mockImplementation(
    async (
      commandLine: string,
      args?: string[],
      options?: ExecOptions
    ): Promise<number> => {
      if (options?.listeners?.stdout) {
        options.listeners.stdout(Buffer.from('1.1.0-rc.0'))
      }
      return 1
    }
  )

  expect(await prereleaseTag('JIRA-999')).toEqual('1.1.0-rc.0')
})

test('Release tag', () => {
  expect(releaseTag('1.1.0-rc.0')).toEqual('1.1.0')
})
