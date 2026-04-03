import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SignInButton } from '@/components/SignInButton'

export default async function HomePage() {
  const session = await auth()
  if (session) redirect('/browse')

  return (
    <div className="page-center">
      <h1>Dragons Editor</h1>
      <p className="muted">Sign in with GitHub to edit dragonfly species data.</p>
      <SignInButton />
    </div>
  )
}
