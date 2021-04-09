import * as core from '@actions/core'
import * as github from '@actions/github'
import {deleteEnvironment} from '../src/environment'

test('Delete invalid environment', async () => {
  const key = 'JIRA-999'
  const token = process.env.GITHUB_TOKEN as string

  expect(await deleteEnvironment(token, key)).toEqual(404)
})

test('Delete environment', async () => {
  const key = 'JIRA-999'
  const token = process.env.GITHUB_TOKEN as string

  const octokit = github.getOctokit(token, {
    log: {
      debug: core.debug,
      info: core.info,
      warn: core.warning,
      error: core.error
    }
  })

  await octokit.repos.createOrUpdateEnvironment({
    environment_name: `staging:${key}`,
    ...github.context.repo
  })

  expect(await deleteEnvironment(token, key)).toEqual(204)
})
