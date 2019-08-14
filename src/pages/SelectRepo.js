import React, { useState } from 'react'
import useReactRouter from 'use-react-router'

import {
  SubmitButton,
  TextField,
  CenterXY,
  GlobalStyle
} from '../styled/components'

export default () => {
  const [gitHubRepoUrl, setGitHubRepoUrl] = useState('')
  const { history } = useReactRouter()

  const handleSubmit = async event => {
    event.preventDefault()
    const path = new URL(gitHubRepoUrl).pathname.split('/')
    const params = new URLSearchParams()
    params.set('repo', `${path[1]}/${path[2]}`)
    history.push(`/github?${params}`)
  }
  return (
    <form>
      <GlobalStyle />
      <CenterXY>
        <TextField
          type="url"
          placeholder="Enter GitHub repo URL"
          value={gitHubRepoUrl}
          onChange={e => setGitHubRepoUrl(e.target.value)}
        />
        <SubmitButton disabled={!gitHubRepoUrl} onClick={handleSubmit}>
          See events
        </SubmitButton>
      </CenterXY>
    </form>
  )
}
