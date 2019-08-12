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
    history.push(`/github${new URL(gitHubRepoUrl).pathname}`)
  }
  return (
    <form>
      <GlobalStyle />>
      <CenterXY>
        <TextField
          type="url"
          placeholder="GitHub repo URL"
          value={gitHubRepoUrl}
          onChange={e => setGitHubRepoUrl(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>Do it</SubmitButton>
      </CenterXY>
    </form>
  )
}
