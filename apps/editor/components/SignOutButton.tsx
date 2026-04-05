'use client'
import { signOut } from 'next-auth/react'
import { Button } from 'react-aria-components'

export function SignOutButton() {
  return (
    <Button className="btn btn-secondary" onPress={() => signOut()}>
      Sign out
    </Button>
  )
}
