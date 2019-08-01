import React from 'react'
import { useOauth } from '../hooks'

const AuthApp = () => {
  useOauth()
  return <p>Loading your new streams...</p>
}

export default AuthApp
