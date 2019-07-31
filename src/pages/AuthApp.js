import React, { useEffect } from 'react'
import useReactRouter from 'use-react-router'
import axios from 'axios'

import { authHeader } from '../utils'
import { SERVER_HOST, STREAMS_JWT } from '../constants'

const AuthApp = () => {
  const {
    location: { search },
    match
  } = useReactRouter()

  const app = match.params.app
  const params = new URLSearchParams(search)
  const code = params.get('code')
  useEffect(() => {
    console.log('code: ', code)
    const sendAppTokenToServer = async () => {
      const jwt = localStorage.getItem(STREAMS_JWT)
      const { data } = await axios.put(
        `${SERVER_HOST}/auth/${app}?code=${code}`,
        {},
        authHeader(jwt)
      )

      console.log(data)
    }

    sendAppTokenToServer()
  }, [app, code])
  return <p>check the console logs --> should be authenticated</p>
}

export default AuthApp
