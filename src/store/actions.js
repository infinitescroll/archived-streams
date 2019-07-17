import {
  REQUESTED_STREAM_EVENTS,
  REQUESTED_STREAM_EVENTS_SUCCESS,
  REQUESTED_STREAM_EVENTS_ERROR
} from './actionTypes'

export const requestedStreamEvents = () => {
  return {
    type: REQUESTED_STREAM_EVENTS
  }
}

export const requestedStreamEventsSuccess = payload => {
  return {
    type: REQUESTED_STREAM_EVENTS_SUCCESS,
    payload
  }
}

export const requestedStreamEventsError = error => {
  return {
    type: REQUESTED_STREAM_EVENTS_ERROR,
    error
  }
}
