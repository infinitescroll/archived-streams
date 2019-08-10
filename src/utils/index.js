export * from './filters'
export * from './storage'
export * from './authHelpers'

export const flatten2DArray = nestedArray =>
  nestedArray.reduce((flatArray, nest) => [...flatArray, ...nest], [])
