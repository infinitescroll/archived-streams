import { DROPBOX_CLIENT_ID, ARENA_CLIENT_ID } from './secrets'
export const GITHUB = 'github'
export const TRELLO = 'trello'
export const ARENA = 'arena'
export const DROPBOX = 'dropbox'
export const SLACK = 'slack'

export const STREAMS_USER = 'streams_user'
export const STREAMS_JWT = 'streams_jwt'

export const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ'

export const SERVER_HOST = 'http://localhost:3001/api/v0'
export const MAGIC_LINK_ENDPOINT = 'auth/magic-link'
export const MY_USER_ENDPOINT = 'users/me'

export const CLIENT_HOST = 'http://localhost:3000'

export const APP_AUTH_ENDPOINTS = {
  [GITHUB]: '',
  [TRELLO]: '',
  [SLACK]: '',
  [ARENA]: `http://dev.are.na/oauth/authorize?client_id=${ARENA_CLIENT_ID}&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code`,
  [DROPBOX]: `https://www.dropbox.com/oauth2/authorize?client_id=${DROPBOX_CLIENT_ID}&response_type=code&redirect_uri=${CLIENT_HOST}/authorize/app/${DROPBOX}`
}
