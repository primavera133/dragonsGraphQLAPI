'use client'
import { signIn } from 'next-auth/react'
import { Button } from 'react-aria-components'

export function SignInButton() {
  return (
    <Button className="btn" onPress={() => signIn('github')}>
      Sign in with GitHub
    </Button>
  )
}
