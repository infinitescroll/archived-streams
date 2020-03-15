import cloneDeep from 'lodash.clonedeep'

import {
  REQUESTED_USER,
  REQUESTED_USER_SUCCESS,
  REQUESTED_USER_ERROR
} from './actionTypes'

import {
  initialState,
  requestedUser,
  requestedUserSuccess,
  requestedUserError
} from './states'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTED_USER: {
      return requestedUser(cloneDeep(state))
    }
    case REQUESTED_USER_SUCCESS: {
      return requestedUserSuccess(cloneDeep(state), action.payload)
    }
    case REQUESTED_USER_ERROR: {
      return requestedUserError(cloneDeep(state), action.payload)
    }
    default: {
      return cloneDeep(state)
    }
  }
}

export default reducer
