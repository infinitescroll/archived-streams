import {
  GITHUB,
  TRELLO,
  SLACK,
  ARENA,
  DROPBOX,
  STREAMS_USER
} from '../constants'

const APPLICATION_FILTER = 'application'
const IDENTITY_FILTER = 'identity'

const githubFilterCallback = event => event.app === GITHUB
const trelloFilterCallback = event => event.app === TRELLO
const dropboxFilterCallback = event => event.app === DROPBOX
const slackFilterCallback = event => event.app === SLACK
const arenaFilterCallback = event => event.app === ARENA

const userFilterCallback = () => true

export const GITHUB_FILTER = {
  name: GITHUB,
  callback: githubFilterCallback,
  category: APPLICATION_FILTER
}
export const TRELLO_FILTER = {
  name: TRELLO,
  callback: trelloFilterCallback,
  category: APPLICATION_FILTER
}
export const DROPBOX_FILTER = {
  name: DROPBOX,
  callback: dropboxFilterCallback,
  category: APPLICATION_FILTER
}
export const SLACK_FILTER = {
  name: SLACK,
  callback: slackFilterCallback,
  category: APPLICATION_FILTER
}
export const ARENA_FILTER = {
  name: ARENA,
  callback: arenaFilterCallback,
  category: APPLICATION_FILTER
}

export const USER_FILTER = {
  name: STREAMS_USER,
  callback: userFilterCallback,
  category: IDENTITY_FILTER
}

export const filterMap = new Map([
  [GITHUB, GITHUB_FILTER],
  [TRELLO, TRELLO_FILTER],
  [DROPBOX, DROPBOX_FILTER],
  [SLACK, SLACK_FILTER],
  [ARENA, ARENA_FILTER],
  [STREAMS_USER, USER_FILTER]
])

export const filterEvents = filters => event => {
  const identityFilters = [...filters].filter(
    ([_, filter]) => filter.category === IDENTITY_FILTER
  )
  const appFilters = [...filters].filter(
    ([_, filter]) => filter.category === APPLICATION_FILTER
  )

  return (
    identityFilters.some(([_, filter]) => filter.callback(event)) &&
    appFilters.some(([_, filter]) => filter.callback(event))
  )
}

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
