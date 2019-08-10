import React from 'react'
import useReactRouter from 'use-react-router'
import { useGitHubEvents } from '../hooks'

export default () => {
  const {
    match: {
      params: { owner, repo }
    }
  } = useReactRouter()
  useGitHubEvents(owner, repo)
  return <div>go</div>
}
