import { ReactNode } from 'react'

interface UserMetadata {
  full_name: string
}

interface User {
  user_metadata: UserMetadata
}

interface NetlifyIdentity {
  init: () => void
  on: (event: string, callback: (user: User) => void) => void
  off: (event: string, callback: (user: User) => void) => void
  currentUser: () => User | null
}

interface GatedComponentProps {
  netlifyIdentity: NetlifyIdentity
  children: ReactNode
  noAccessContent: ReactNode
  reloadOnLogin?: boolean
}

declare const GatedComponent: React.FC<GatedComponentProps>

export default GatedComponent
