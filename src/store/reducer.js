import cloneDeep from 'lodash.clonedeep'

import {
  REQUESTED_STREAM_EVENTS,
  REQUESTED_STREAM_EVENTS_SUCCESS,
  REQUESTED_STREAM_EVENTS_ERROR,
  APPLY_FILTERS,
  REMOVE_FILTERS,
  REQUESTED_USER,
  REQUESTED_USER_SUCCESS,
  REQUESTED_USER_ERROR,
  RETRIEVED_GITHUB_REPOS
} from './actionTypes'

import {
  initialState,
  requestedUser,
  requestedUserSuccess,
  requestedUserError,
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError,
  appliedFilters,
  removedFilters,
  retrievedGithubRepos
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
    case RETRIEVED_GITHUB_REPOS: {
      return retrievedGithubRepos(cloneDeep(state), action.payload)
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
    case APPLY_FILTERS: {
      return appliedFilters(cloneDeep(state), action.payload)
    }
    case REMOVE_FILTERS: {
      return removedFilters(cloneDeep(state), action.payload)
    }
    default: {
      return cloneDeep(state)
    }
  }
}

export default reducer
