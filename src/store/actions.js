import {
  REQUESTED_STREAM_EVENTS,
  REQUESTED_STREAM_EVENTS_SUCCESS,
  REQUESTED_STREAM_EVENTS_ERROR,
  APPLY_FILTERS,
  REMOVE_FILTERS,
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

export const applyFilters = filters => {
  return {
    type: APPLY_FILTERS,
    payload: {
      filters
    }
  }
}

export const removeFilters = filters => {
  return {
    type: REMOVE_FILTERS,
    payload: {
      filters
    }
  }
}
