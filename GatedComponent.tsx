/// <reference path="GatedComponent.d.ts" />

import React, { useEffect, useState } from 'react'

export default function GatedComponent({
  netlifyIdentity,
  children,
  noAccessContent,
  reloadOnLogin = true
}: {
  netlifyIdentity: any
  children: React.ReactNode
  noAccessContent?: React.ReactNode
  reloadOnLogin?: boolean
}) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [netlifyInitSet, setNetlifyInitSet] = useState(false)

  useEffect(() => {
    netlifyIdentity.init()

    const handleLogin = (user: { user_metadata: { full_name: string } }) => {
      if (!user.user_metadata || !user.user_metadata.full_name) return
      setLoggedIn(true)

      if (!netlifyInitSet) {
        setNetlifyInitSet(true)
      }
      if (reloadOnLogin) {
        window.location.reload()
      }
    }

    const handleLogout = () => {
      setLoggedIn(false)
      if (reloadOnLogin) {
        window.location.reload()
      }
    }

    netlifyIdentity.on('login', handleLogin)
    netlifyIdentity.on('logout', handleLogout)

    const currentUser = netlifyIdentity.currentUser()

    if (currentUser) {
      setLoggedIn(true)

      if (!netlifyInitSet) {
        setNetlifyInitSet(true)
      }
    }

    return () => {
      // If the component is unmounted, remove the event listeners
      netlifyIdentity.off('login', handleLogin)
      netlifyIdentity.off('logout', handleLogout)
    }
  }, [])

  return (
    <>
      {loggedIn && netlifyInitSet && <>{children}</>}
      {!loggedIn && <>{noAccessContent}</>}
    </>
  )
}
