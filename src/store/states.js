export const initialState = {
  events: {
    data: [],
    error: {},
    filters: new Map(),
    loading: false,
    loaded: false,
    loadedSuccess: false
  },

  user: {
    email: '',
    authedApps: {},
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
export const appliedFilters = (state, { filters }) => {
  return {
    events: {
      ...state.events,
      filters: new Map([...state.events.filters, ...filters])
    }
  }
}

export const removedFilters = (state, { filters }) => {
  filters.forEach(filter => state.events.filters.delete(filter))
  return {
    events: {
      ...state.events,
      filters: new Map([...state.events.filters])
    }
  }
}
