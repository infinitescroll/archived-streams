import { GITHUB, TRELLO, SLACK, ARENA, DROPBOX } from '../constants'

export const initialState = {
  events: {
    data: {
      today: [],
      yesterday: [],
      lastWeek: [],
      lastMonth: [],
      catchAll: []
    },
    error: {},
    filters: {},
    groupby: '',
    loading: false,
    loaded: false,
    loadedSuccess: false
  },

  user: {
    email: '',
    id: '',
    apps: {
      [GITHUB]: {},
      [TRELLO]: {},
      [SLACK]: {},
      [ARENA]: {},
      [DROPBOX]: {}
    },
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
  if (!payload.user.apps) payload.user.apps = {}
  return {
    ...state,

    user: {
      email: payload.user.email,
      id: payload.user._id,
      apps: {
        [GITHUB]: { ...payload.user.apps[GITHUB] },
        [TRELLO]: { ...payload.user.apps[TRELLO] },
        [SLACK]: { ...payload.user.apps[SLACK] },
        [ARENA]: { ...payload.user.apps[ARENA] },
        [DROPBOX]: { ...payload.user.apps[DROPBOX] }
      },
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
export const retrievedAppData = (state, payload) => {
  let newSingleAppState = {}
  if (payload.data.app === SLACK) {
    newSingleAppState = {
      ...state.user.apps[payload.data.app],
      channels: payload.data.data.channels
    }
  }

  if (payload.data.app === GITHUB) {
    newSingleAppState = {
      ...state.user.apps[payload.data.app],
      repos: payload.data.data
    }
  }

  return {
    ...state,

    user: {
      ...state.user,
      apps: {
        ...state.user.apps,
        [payload.data.app]: newSingleAppState
      }
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
      data: payload.data
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
      filters
    }
  }
}

export const appliedGroup = (state, { group }) => {
  return {
    ...state,

    events: {
      ...state.events,
      groupby: group
    }
  }
}

export const removedGroup = state => {
  return {
    ...state,

    events: {
      ...state.events,
      groupby: ''
    }
  }
}
