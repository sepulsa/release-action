import {execSync} from 'child_process'
import {prereleaseTag, releaseTag} from '../src/tag'

beforeAll(() => {
  execSync('git tag JIRA-999')
  execSync('git tag 1.1.0-rc.0')
})

afterAll(() => {
  execSync('git tag --delete JIRA-999 1.1.0-rc.0')
})

test('Prerelease tag', async () => {
  expect(await prereleaseTag('JIRA-999')).toEqual('1.1.0-rc.0')
})

test('Release tag', () => {
  expect(releaseTag('1.1.0-rc.0')).toEqual('1.1.0')
})
