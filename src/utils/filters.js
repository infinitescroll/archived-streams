import { GITHUB, TRELLO, SLACK, ARENA, DROPBOX } from '../constants'

const githubFilterCallback = event => event.app === GITHUB
const trelloFilterCallback = event => event.app === TRELLO
const dropboxFilterCallback = event => event.app === DROPBOX
const slackFilterCallback = event => event.app === SLACK
const arenaFilterCallback = event => event.app === ARENA

export const GITHUB_FILTER = { type: GITHUB, callback: githubFilterCallback }
export const TRELLO_FILTER = { type: TRELLO, callback: trelloFilterCallback }
export const DROPBOX_FILTER = { type: DROPBOX, callback: dropboxFilterCallback }
export const SLACK_FILTER = { type: SLACK, callback: slackFilterCallback }
export const ARENA_FILTER = { type: ARENA, callback: arenaFilterCallback }

export const filterEvents = filters => event =>
  filters.every(filter => filter.callback(event))
