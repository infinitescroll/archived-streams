import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import useReactRouter from 'use-react-router'

import { getFromStorage, authHeader } from '../utils'
import { STREAMS_JWT, SERVER_HOST, MY_USER_ENDPOINT } from '../constants'

import {
  requestedUser,
  requestedUserError,
  requestedUserSuccess
} from '../store/actions'
import axios from 'axios'

export default () => {
  const dispatch = useDispatch()
  const { history } = useReactRouter()
  useEffect(() => {
    const loadUser = async jwt => {
      dispatch(requestedUser())
      try {
        const { data } = await axios.get(
          `${SERVER_HOST}/${MY_USER_ENDPOINT}`,
          authHeader(jwt)
        )
        dispatch(requestedUserSuccess(data))
      } catch (err) {
        dispatch(requestedUserError(err))
      }
    }

    const jwt = getFromStorage(STREAMS_JWT)
    if (jwt) {
      loadUser(jwt)
    } else {
      history.replace('/start')
    }
  }, [dispatch, history])

  const { loadingUser, loadedUser } = useSelector(({ user }) => ({
    loadingUser: user.loading,
    loadedUser: user.loaded
  }))

  return {
    loadingUser,
    loadedUser
  }
}
