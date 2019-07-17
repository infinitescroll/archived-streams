export const initialState = {
  events: {
    loading: false,
    loaded: false,
    loadedSuccess: false,
    data: {},
    error: {}
  }
}

export const requestedStreamEvents = state => {
  return {
    events: {
      ...state.events,
      loading: true,
      loaded: false,
      loadedSuccess: false
    }
  }
}
export const requestedStreamEventsSuccess = (state, payload) => {
  return {
    events: {
      ...state.events,
      loading: false,
      loaded: true,
      loadedSuccess: true,
      data: { ...state.data, ...payload.data }
    }
  }
}
export const requestedStreamEventsError = (state, error) => {
  return {
    events: {
      ...state.events,
      loading: true,
      loaded: false,
      loadedSuccess: false,
      error
    }
  }
}
