export const initialState = {
  user: {
    email: '',
    id: '',
    streams: [],
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
      streams: payload.user.streams,
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
