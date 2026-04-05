import { SignInButton } from '@/components/SignInButton'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const session = await auth()
  if (session) redirect('/browse')

  return (
    <div className="page-center">
      <h1>Dragonfly API Editor</h1>
      <p className="muted">
        Sign in with GitHub to edit dragonfly species data.
      </p>
      <SignInButton />
    </div>
  )
}
