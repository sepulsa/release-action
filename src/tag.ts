import {exec, ExecOptions} from '@actions/exec'
import {SemVer} from 'semver'

export async function prereleaseTag(key: string): Promise<string> {
  let output = ''

  const options: ExecOptions = {
    listeners: {
      stdout: (data: Buffer) => {
        output += data.toString().trim()
      }
    }
  }
  await exec(
    'git',
    ['tag', '--list', '--ignore-case', '--points-at', key, '*.*.*'],
    options
  )
  return output
}

export function releaseTag(prerelease_tag: string): string {
  const semver = new SemVer(prerelease_tag)
  const inc = semver.inc('minor')
  return inc.version
}
