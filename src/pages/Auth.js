import React, { useEffect } from 'react'
import useReactRouter from 'use-react-router'
import axios from 'axios'

import { setInStorage } from '../utils'
import { SERVER_HOST, MAGIC_LINK_ENDPOINT, STREAMS_JWT } from '../constants'

const Auth = () => {
  const { history, location } = useReactRouter()
  const { search } = location

  useEffect(() => {
    const convertTokenToLocalStorage = async () => {
      const params = new URLSearchParams(search)
      const authToken = params.get('token')
      const getNewTokenURL = `${SERVER_HOST}/${MAGIC_LINK_ENDPOINT}?token=${authToken}`
      const { data } = await axios.get(getNewTokenURL)

      setInStorage(STREAMS_JWT, data)

      history.replace('/')
    }
    convertTokenToLocalStorage()
  }, [history, search])

  return <div>heyo</div>
}

export default Auth
