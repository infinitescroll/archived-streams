import {
  REQUESTED_USER,
  REQUESTED_USER_SUCCESS,
  REQUESTED_USER_ERROR
} from './actionTypes'

export const requestedUser = () => {
  return {
    type: REQUESTED_USER
  }
}

export const requestedUserSuccess = user => {
  return {
    type: REQUESTED_USER_SUCCESS,
    payload: {
      user
    }
  }
}

export const requestedUserError = err => {
  return {
    type: REQUESTED_USER_ERROR,
    payload: {
      err
    }
  }
}
