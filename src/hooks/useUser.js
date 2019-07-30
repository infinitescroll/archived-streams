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
      const {
        data: { user }
      } = await mockApiUserRequest()
      if (user) {
        // server returned user
        console.log('user: ', user)
        dispatch(requestedUserSuccess(user))
      } else {
        // server returned error
        console.log('user fetch error')
        dispatch(requestedUserError())
      }
    }

    const tokenPresentInStorage = getFromStorage(STREAMS_JWT)
    if (tokenPresentInStorage) {
      loadUser()
    } else {
      // TODO update some new piece of state to
      // route user to a page where they can auth apps
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
