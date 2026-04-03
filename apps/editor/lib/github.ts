import { Octokit } from 'octokit'

export const OWNER = process.env.GITHUB_REPO_OWNER!
export const REPO = process.env.GITHUB_REPO_NAME!
export const DATA_BASE = 'apps/api/_data'
const DEFAULT_BRANCH = 'main'

export function createOctokit(accessToken: string) {
  return new Octokit({ auth: accessToken })
}

export function branchForUser(login: string) {
  return `edit/${login}`
}

type OctokitInstance = ReturnType<typeof createOctokit>

// ── Branch management ──────────────────────────────────────────────────────

export async function ensureBranch(octokit: OctokitInstance, branch: string) {
  try {
    await octokit.rest.repos.getBranch({ owner: OWNER, repo: REPO, branch })
    return
  } catch (e: any) {
    if (e.status !== 404) throw e
  }
  const { data: main } = await octokit.rest.repos.getBranch({
    owner: OWNER,
    repo: REPO,
    branch: DEFAULT_BRANCH,
  })
  await octokit.rest.git.createRef({
    owner: OWNER,
    repo: REPO,
    ref: `refs/heads/${branch}`,
    sha: main.commit.sha,
  })
}

export async function branchExists(
  octokit: OctokitInstance,
  branch: string,
): Promise<boolean> {
  try {
    await octokit.rest.repos.getBranch({ owner: OWNER, repo: REPO, branch })
    return true
  } catch {
    return false
  }
}

export async function getBranchDiff(octokit: OctokitInstance, branch: string) {
  const { data } = await octokit.rest.repos.compareCommitsWithBasehead({
    owner: OWNER,
    repo: REPO,
    basehead: `${DEFAULT_BRANCH}...${branch}`,
  })
  return data.files ?? []
}

// ── File operations ────────────────────────────────────────────────────────

export async function getFile(
  octokit: OctokitInstance,
  path: string,
  ref?: string,
): Promise<{ content: unknown; sha: string }> {
  const { data } = await octokit.rest.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path,
    ref: ref ?? DEFAULT_BRANCH,
  })
  if (Array.isArray(data) || data.type !== 'file') {
    throw Object.assign(new Error(`${path} is not a file`), { status: 400 })
  }
  const text = Buffer.from(data.content, 'base64').toString('utf-8')
  return { content: JSON.parse(text), sha: data.sha }
}

export async function writeFile(
  octokit: OctokitInstance,
  path: string,
  content: unknown,
  branch: string,
  message: string,
  sha?: string,
) {
  const encoded = Buffer.from(JSON.stringify(content, null, 2) + '\n').toString('base64')
  await octokit.rest.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path,
    message,
    content: encoded,
    branch,
    ...(sha ? { sha } : {}),
  })
}

export async function deleteFile(
  octokit: OctokitInstance,
  path: string,
  branch: string,
  message: string,
  sha: string,
) {
  await octokit.rest.repos.deleteFile({
    owner: OWNER,
    repo: REPO,
    path,
    message,
    branch,
    sha,
  })
}

// ── Taxonomy tree ──────────────────────────────────────────────────────────

export interface SpeciesEntry {
  slug: string
  path: string
}

export interface GenusEntry {
  name: string
  path: string
  species: SpeciesEntry[]
}

export interface FamilyEntry {
  name: string
  path: string
  genera: GenusEntry[]
}

export async function getTaxonomyTree(
  octokit: OctokitInstance,
  ref?: string,
): Promise<FamilyEntry[]> {
  const { data: branch } = await octokit.rest.repos.getBranch({
    owner: OWNER,
    repo: REPO,
    branch: ref ?? DEFAULT_BRANCH,
  })

  const { data: tree } = await octokit.rest.git.getTree({
    owner: OWNER,
    repo: REPO,
    tree_sha: branch.commit.commit.tree.sha,
    recursive: '1',
  })

  const paths = (tree.tree ?? [])
    .filter(
      (item) =>
        item.type === 'blob' && item.path?.startsWith(`${DATA_BASE}/families/`),
    )
    .map((item) => item.path!)

  return buildTree(paths)
}

function buildTree(paths: string[]): FamilyEntry[] {
  const families = new Map<string, FamilyEntry>()

  for (const p of paths) {
    const rel = p.replace(`${DATA_BASE}/families/`, '')
    const parts = rel.split('/')

    const familyName = parts[0]
    if (!familyName) continue

    if (!families.has(familyName)) {
      families.set(familyName, {
        name: familyName,
        path: `${DATA_BASE}/families/${familyName}/about.json`,
        genera: [],
      })
    }
    const family = families.get(familyName)!

    const genusName = parts[1]
    if (!genusName || genusName === 'about.json') continue

    let genus = family.genera.find((g) => g.name === genusName)
    if (!genus) {
      genus = {
        name: genusName,
        path: `${DATA_BASE}/families/${familyName}/${genusName}/about.json`,
        species: [],
      }
      family.genera.push(genus)
    }

    const filename = parts[2]
    if (!filename || filename === 'about.json') continue

    genus.species.push({
      slug: filename.replace('.json', ''),
      path: `${DATA_BASE}/families/${familyName}/${genusName}/${filename}`,
    })
  }

  return Array.from(families.values()).sort((a, b) => a.name.localeCompare(b.name))
}

// ── Pull request ───────────────────────────────────────────────────────────

export async function createPullRequest(
  octokit: OctokitInstance,
  branch: string,
  title: string,
  body: string,
) {
  const { data } = await octokit.rest.pulls.create({
    owner: OWNER,
    repo: REPO,
    head: branch,
    base: DEFAULT_BRANCH,
    title,
    body,
  })
  return data
}
