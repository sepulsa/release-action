import {exec} from '@actions/exec'
import {prerelease, SemVer, sort} from 'semver'

export async function prereleaseTag(key: string): Promise<string | undefined> {
  let output = ''

  await exec(
    'git',
    [
      'tag',
      '--list',
      '--ignore-case',
      '--points-at',
      key,
      '[0-9]*.[0-9]*.[0-9]*'
    ],
    {
      listeners: {
        stdout: (data: Buffer) => {
          output += data.toString().trim()
        }
      }
    }
  )

  const tags = output
    .trim()
    .split('\n')
    .filter(tag => prerelease(tag))

  return sort(tags).pop()
}

export function releaseTag(prerelease_tag: string): string {
  const semver = new SemVer(prerelease_tag)
  return semver.inc('minor').version
}
