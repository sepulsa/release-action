import {deleteEnvironment} from '../src/environment'

test('Delete invalid environment', async () => {
  const key = 'JIRA-404'
  expect(await deleteEnvironment('', key)).toEqual(404)
})

test('Delete environment', async () => {
  const key = 'JIRA-204'
  expect(await deleteEnvironment('', key)).toEqual(204)
})
