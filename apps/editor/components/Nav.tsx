import { auth } from '@/lib/auth'
import { SignInButton } from './SignInButton'
import { SignOutButton } from './SignOutButton'

export async function Nav() {
  const session = await auth()

  return (
    <nav className="nav">
      <span className="nav-title">Dragons Editor</span>
      <div className="nav-actions">
        {session ? (
          <>
            <span className="nav-user">{session.user?.name ?? session.user?.email}</span>
            <SignOutButton />
          </>
        ) : (
          <SignInButton />
        )}
      </div>
    </nav>
  )
}
