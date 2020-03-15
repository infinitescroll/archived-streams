import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { getFromStorage, authHeader } from '../utils'
import { STREAMS_JWT, API_ENDPOINT } from '../constants'

import {
  requestedUser,
  requestedUserError,
  requestedUserSuccess
} from '../store/actions'

export default () => {
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    const loadUser = async jwt => {
      dispatch(requestedUser())
      try {
        const { data } = await axios.get(
          `${API_ENDPOINT}/users/me`,
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
      router.replace('/start/1')
    }
  }, [dispatch, router])

  const user = useSelector(state => {
    return state.user
  })

  return user
}
