import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getFromStorage } from '../utils'
import { STREAMS_JWT } from '../constants'
import mockApiUserRequest from '../mockApi'
import {
  requestedUser,
  requestedUserError,
  requestedUserSuccess
} from '../store/actions'

export default () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const loadUser = async () => {
      dispatch(requestedUser())
      try {
        const {
          data: { user }
        } = await mockApiUserRequest()
        dispatch(requestedUserSuccess(user))
      } catch (error) {
        dispatch(requestedUserError())
      }
    }

    const tokenPresentInStorage = getFromStorage(STREAMS_JWT)
    if (tokenPresentInStorage) {
      loadUser()
    }
  }, [dispatch])

  const { loadingUser, loadedUser } = useSelector(({ user }) => ({
    loadingUser: user.loading,
    loadedUser: user.loaded
  }))

  return {
    loadingUser,
    loadedUser
  }
}
