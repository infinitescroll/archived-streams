export const initialState = {
  events: {
    data: [],
    error: {},
    filters: [],
    loading: false,
    loaded: false,
    loadedSuccess: false
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
      data: [...state.events.data, ...payload.data]
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
export const appliedFilter = (state, { filter }) => {
  return {
    events: {
      ...state.events,
      filters: [...state.events.filters, filter]
    }
  }
}
