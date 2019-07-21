import { GITHUB, TRELLO, SLACK, ARENA, DROPBOX } from '../constants'

const githubFilterCallback = event => event.app === GITHUB
const trelloFilterCallback = event => event.app === TRELLO
const dropboxFilterCallback = event => event.app === DROPBOX
const slackFilterCallback = event => event.app === SLACK
const arenaFilterCallback = event => event.app === ARENA

export const GITHUB_FILTER = [GITHUB, githubFilterCallback]
export const TRELLO_FILTER = [TRELLO, trelloFilterCallback]
export const DROPBOX_FILTER = [DROPBOX, dropboxFilterCallback]
export const SLACK_FILTER = [SLACK, slackFilterCallback]
export const ARENA_FILTER = [ARENA, arenaFilterCallback]

export const filterMap = new Map([
  GITHUB_FILTER,
  TRELLO_FILTER,
  DROPBOX_FILTER,
  SLACK_FILTER,
  ARENA_FILTER
])

export const filterEvents = filters => event =>
  [...filters].every(([_, callback]) => callback(event))

export const getListOfFiltersFromUrlBar = params => {
  const filterListFromUrlBar = params.get('filters')
  if (!filterListFromUrlBar) return []

  return filterListFromUrlBar.split(' ').filter(filter => filterMap.has(filter))
}

export const addSearchParam = (filterListFromUrlBar, newFilter) => {
  return `filters=${[...filterListFromUrlBar, newFilter].join('+')}`
}

export const removeSearchParam = (filterListFromUrlBar, filterToRemove) => {
  const newFilterList = filterListFromUrlBar.filter(
    filter => !(filter === filterToRemove)
  )
  if (newFilterList.length === 0) return 'filters=null'
  return `filters=${[...newFilterList].join('+')}`
}
