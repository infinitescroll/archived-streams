import dayjs from 'dayjs'
import { hoursToEmoji } from '../constants'

export * from './filters'
export * from './storage'
export * from './authHelpers'
export * from './events'
export * from './groups'

export const flatten2DArray = nestedArray =>
  nestedArray.reduce((flatArray, nest) => [...flatArray, ...nest], [])

export const timeToEmoji = time => hoursToEmoji[dayjs(time).format('HH')]

export const switchCases = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase
