import {
  REQUESTED_STREAM_EVENTS,
  REQUESTED_STREAM_EVENTS_SUCCESS,
  REQUESTED_STREAM_EVENTS_ERROR,
  APPLY_FILTERS,
  REMOVE_FILTER
} from './actionTypes'

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

export const removeFilter = filter => {
  return {
    type: REMOVE_FILTER,
    payload: {
      filter
    }
  }
}
