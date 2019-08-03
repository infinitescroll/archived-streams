import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { retrievedAppData } from '../store/actions'
import { APP_DATA_ENDPOINTS } from '../constants'
import { generateAppParams } from '../utils'

export default app => {
  const dispatch = useDispatch()
  const { token } = useSelector(({ user }) => ({
    loadedUser: user.loaded,
    token: user.apps[app].accessToken
  }))

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const { data } = await axios.get(
          APP_DATA_ENDPOINTS[app],
          generateAppParams(app, token)
        )
        dispatch(retrievedAppData({ app, data }))
      } catch (err) {
        throw new Error(err)
      }
    }

    if (token) {
      retrieveData(app)
    }
  }, [app, dispatch, token])
}
