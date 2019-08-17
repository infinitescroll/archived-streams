import cloneDeep from 'lodash.clonedeep'

import {
  APPLY_FILTER_SET,
  APPLY_GROUP,
  REQUESTED_STREAM_EVENTS,
  REQUESTED_STREAM_EVENTS_SUCCESS,
  REQUESTED_STREAM_EVENTS_ERROR,
  REQUESTED_USER,
  REQUESTED_USER_SUCCESS,
  REQUESTED_USER_ERROR,
  RETRIEVED_APP_DATA,
  REMOVE_GROUP
} from './actionTypes'

import {
  appliedFilters,
  appliedGroup,
  removedGroup,
  initialState,
  requestedUser,
  requestedUserSuccess,
  requestedUserError,
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError,
  retrievedAppData
} from './states'

export const reducer = (state = initialState, action) => {
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
    case RETRIEVED_APP_DATA: {
      return retrievedAppData(cloneDeep(state), action.payload)
    }
    case REQUESTED_STREAM_EVENTS: {
      return requestedStreamEvents(cloneDeep(state))
    }
    case REQUESTED_STREAM_EVENTS_SUCCESS: {
      return requestedStreamEventsSuccess(cloneDeep(state), action.payload)
    }
    case REQUESTED_STREAM_EVENTS_ERROR: {
      return requestedStreamEventsError(cloneDeep(state), action.error)
    }
    case APPLY_FILTER_SET: {
      return appliedFilters(cloneDeep(state), action.payload)
    }
    case APPLY_GROUP: {
      return appliedGroup(cloneDeep(state), action.payload)
    }
    case REMOVE_GROUP: {
      return removedGroup(cloneDeep(state), action.payload)
    }
    default: {
      return cloneDeep(state)
    }
  }
}

export default reducer
