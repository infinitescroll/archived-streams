import {
  APPLY_FILTER_SET,
  APPLY_GROUP,
  REMOVE_GROUP,
  REQUESTED_STREAM_EVENTS,
  REQUESTED_STREAM_EVENTS_SUCCESS,
  REQUESTED_STREAM_EVENTS_ERROR,
  REQUESTED_USER,
  REQUESTED_USER_SUCCESS,
  REQUESTED_USER_ERROR,
  RETRIEVED_APP_DATA
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

export const retrievedAppData = data => {
  return {
    type: RETRIEVED_APP_DATA,
    payload: {
      data
    }
  }
}

export const requestedStreamEvents = () => {
  return {
    type: REQUESTED_STREAM_EVENTS
  }
}

export const requestedStreamEventsSuccess = data => {
  return {
    type: REQUESTED_STREAM_EVENTS_SUCCESS,
    payload: {
      data
    }
  }
}

export const requestedStreamEventsError = error => {
  return {
    type: REQUESTED_STREAM_EVENTS_ERROR,
    error
  }
}

export const applyFilterSet = filters => {
  return {
    type: APPLY_FILTER_SET,
    payload: {
      filters
    }
  }
}

export const applyGroup = group => {
  return {
    type: APPLY_GROUP,
    payload: {
      group
    }
  }
}

export const removeGroup = () => {
  return {
    type: REMOVE_GROUP
  }
}
