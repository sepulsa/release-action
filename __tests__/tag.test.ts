import {execSync} from 'child_process'
import {prereleaseTag, releaseTag} from '../src/tag'

beforeAll(async () => {
  execSync('git tag jira-123')
  execSync('git tag 0.1.1-rc.0')
})

afterAll(async () => {
  execSync('git tag --delete jira-123 0.1.1-rc.0')
})

test('Prerelease tag', async () => {
  expect(await prereleaseTag('jira-123')).toEqual('0.1.1-rc.0')
})

test('Release tag', async () => {
  expect(releaseTag('0.1.1-rc.0')).toEqual('0.1.1')
})
