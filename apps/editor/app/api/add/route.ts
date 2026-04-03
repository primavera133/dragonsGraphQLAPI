import { type NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { createOctokit, writeFile, ensureBranch, branchForUser, DATA_BASE } from '@/lib/github'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { type, family, genus, slug, name } = await req.json()
  const octokit = createOctokit(session.accessToken)
  const branch = branchForUser(session.user.login)
  await ensureBranch(octokit, branch)

  if (type === 'species') {
    if (!family || !genus || !slug) {
      return Response.json({ error: 'Missing fields' }, { status: 400 })
    }
    const path = `${DATA_BASE}/families/${family}/${genus}/${slug}.json`
    const content = {
      items_id: crypto.randomUUID(),
      scientific_name: slug.replace(/-/g, ' '),
      author_citation: '',
      local_names: [],
      description: '',
      behaviour: '',
      size: {},
      flight_period: '',
      habitat: '',
      distribution: '',
      similar_species: [],
      red_list: {},
      images: { cloud_name: '', all: [] },
      sources: [],
      links: [],
      meta: [],
    }
    await writeFile(octokit, path, content, branch, `Add species ${slug}`)
    return Response.json({ ok: true, redirect: `/browse/${family}/${genus}/${slug}` })
  }

  if (type === 'genus') {
    if (!family || !name) {
      return Response.json({ error: 'Missing fields' }, { status: 400 })
    }
    const path = `${DATA_BASE}/families/${family}/${name}/about.json`
    const content = { title: name, author_citation: '', description: '', sources: [], links: [], meta: [] }
    await writeFile(octokit, path, content, branch, `Add genus ${name}`)
    return Response.json({ ok: true, redirect: `/browse/${family}/${name}` })
  }

  if (type === 'family') {
    if (!name) {
      return Response.json({ error: 'Missing fields' }, { status: 400 })
    }
    const path = `${DATA_BASE}/families/${name}/about.json`
    const content = { title: name, author_citation: '', description: '', sources: [], links: [], meta: [] }
    await writeFile(octokit, path, content, branch, `Add family ${name}`)
    return Response.json({ ok: true, redirect: `/browse/${name}` })
  }

  return Response.json({ error: 'Unknown type' }, { status: 400 })
}
