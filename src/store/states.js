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
    id: '',
    apps: {},
    loading: false,
    loaded: false,
    loadedSuccess: false
  }
}

export const requestedUser = state => {
  return {
    ...state,

    user: {
      ...state.user,
      loading: true,
      loaded: false,
      loadedSuccess: false
    }
  }
}

export const requestedUserSuccess = (state, payload) => {
  return {
    ...state,

    user: {
      email: payload.user.email,
      id: payload.user._id,
      apps: { ...payload.user.apps },
      loading: false,
      loaded: true,
      loadedSuccess: true
    }
  }
}

export const requestedUserError = (state, error) => {
  return {
    ...state,

    user: {
      ...state.user,
      loading: false,
      loaded: false,
      loadedSuccess: false,
      error
    }
  }
}

export const requestedStreamEvents = state => {
  return {
    ...state,

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
    ...state,

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
    ...state,

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
    ...state,

    events: {
      ...state.events,
      filters: new Map([...state.events.filters, ...filters])
    }
  }
}

export const removedFilters = (state, { filters }) => {
  filters.forEach(filter => state.events.filters.delete(filter))
  return {
    ...state,

    events: {
      ...state.events,
      filters: new Map([...state.events.filters])
    }
  }
}
