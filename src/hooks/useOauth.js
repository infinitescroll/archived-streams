import { useEffect } from 'react'
import useReactRouter from 'use-react-router'
import axios from 'axios'

import { authHeader, generateAuthQueryParams } from '../utils'
import {
  SERVER_HOST,
  STREAMS_JWT,
  APP_AUTH_PROTOCOL,
  OAUTH1,
  OAUTH2
} from '../constants'

const useOauth = () => {
  const { history, location, match } = useReactRouter()
  const params = new URLSearchParams(location.search)
  const app = match.params.app

  useEffect(() => {
    const sendAppTokenToServer = async (params, app) => {
      const jwt = localStorage.getItem(STREAMS_JWT)
      const authType = APP_AUTH_PROTOCOL[app]

      let queryParams = ''

      if (authType === OAUTH1) {
        const token = location.hash.split('token=')[1]
        queryParams = generateAuthQueryParams('token', token)
      } else if (authType === OAUTH2) {
        const code = params.get('code')
        queryParams = generateAuthQueryParams('code', code)
      } else {
        throw new Error('wrong auth type')
      }

      await axios.put(
        `${SERVER_HOST}/auth/${app}?${queryParams}`,
        {},
        authHeader(jwt)
      )
      history.push('/')
    }

    sendAppTokenToServer(params, app)
  }, [params, app, match, location, history])
}

export default useOauth
