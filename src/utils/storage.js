export const setInStorage = (key, value) =>
  window.localStorage.setItem(key, value)

export const getFromStorage = key => window.localStorage.getItem(key)
