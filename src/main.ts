import * as core from '@actions/core'
import {exec} from '@actions/exec'
import {deleteEnvironment} from './environment'
import {prereleaseTag, releaseTag} from './tag'

async function run(): Promise<void> {
  try {
    const key = core.getInput('key', {required: true}).toLowerCase()
    const token = core.getInput('token', {required: true})

    const prerelease_tag = await prereleaseTag(key)
    const release_tag = releaseTag(prerelease_tag)

    await core.group('Create release tag', async () => {
      await exec('git', ['tag', release_tag, key])
      await exec('git', ['push', 'origin', release_tag])
    })

    await core.group('Clean up prerelease tag', async () => {
      await exec('git', ['tag', '--delete', prerelease_tag, key])
      await exec('git', ['push', '--delete', 'origin', key])
      await exec('git', ['push', '--delete', 'origin', prerelease_tag])
    })

    await deleteEnvironment(token, key)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
