export const setInStorage = (key, value) => {
  if (window && window.localStorage) {
    window.localStorage.setItem(key, value)
  } else {
    throw new Error('attempted to set in storage server side')
  }
}

export const getFromStorage = key => {
  if (window && window.localStorage) {
    return window.localStorage.getItem(key)
  }
  throw new Error('attempted to get in storage server side')
}

export const authHeader = jwt => {
  return {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }
}
