import { auth } from '@/lib/auth'
import { SignInButton } from './SignInButton'
import { SignOutButton } from './SignOutButton'
import { BranchPanel } from './BranchPanel'

export async function Nav() {
  const session = await auth()

  return (
    <nav className="nav">
      <span className="nav-title">Dragons Editor</span>
      <div className="nav-actions">
        {session ? (
          <>
            <span className="nav-user">{session.user?.name ?? session.user?.email}</span>
            <BranchPanel />
            <SignOutButton />
          </>
        ) : (
          <SignInButton />
        )}
      </div>
    </nav>
  )
}
