import { Octokit } from 'octokit'

export const OWNER = process.env.GITHUB_REPO_OWNER!
export const REPO = process.env.GITHUB_REPO_NAME!
export const DATA_BASE = 'apps/api/_data'

export function createOctokit(accessToken: string) {
  return new Octokit({ auth: accessToken })
}

export function branchForUser(username: string) {
  return `edit/${username}`
}
