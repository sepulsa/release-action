import {deleteEnvironment} from '../src/environment'

test('Delete invalid environment', async () => {
  const key = 'JIRA-404'
  const token = process.env.GITHUB_TOKEN as string

  expect(await deleteEnvironment('', key)).toEqual(404)
})

test('Delete environment', async () => {
  const key = 'JIRA-204'
  const token = process.env.GITHUB_TOKEN as string

  expect(await deleteEnvironment('', key)).toEqual(204)
})
