import {
  DROPBOX_CLIENT_ID,
  ARENA_CLIENT_ID,
  SLACK_CLIENT_ID,
  GITHUB_CLIENT_ID
} from './secrets'

export const GITHUB = 'github'
export const TRELLO = 'trello'
export const ARENA = 'arena'
export const DROPBOX = 'dropbox'
export const SLACK = 'slack'
export const STREAMS_USER = 'streams_user'
export const STREAMS_JWT = 'streams_jwt'
export const STREAM_SETTINGS = 'stream_settings'

export const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ'

export const SERVER_HOST = 'http://localhost:3001/api/v0'
export const MAGIC_LINK_ENDPOINT = 'auth/magic-link'
export const MY_USER_ENDPOINT = 'users/me'

export const CLIENT_HOST = 'http://localhost:3000'
export const APP_DATA_ENDPOINTS = {
  [SLACK]: 'https://slack.com/api/conversations.list',
  [GITHUB]: 'https://api.github.com/user/repos'
}
export const APP_AUTH_ENDPOINTS = {
  [GITHUB]: `https://github.com/login/oauth/authorize?scope=repo&client_id=${GITHUB_CLIENT_ID}&redirect_uri=${CLIENT_HOST}/authorize/app/${GITHUB}`,
  [TRELLO]: `https://trello.com/1/authorize?scope=read&response_type=token&key=09de14caa4492e8d4d8628e1de285ab2&return_url=${CLIENT_HOST}/authorize/app/${TRELLO}`,
  [SLACK]: `https://slack.com/oauth/authorize?&client_id=${SLACK_CLIENT_ID}&redirect_uri=${CLIENT_HOST}/authorize/app/${SLACK}&scope=channels%3Aread+channels%3Ahistory`,
  [ARENA]: `http://dev.are.na/oauth/authorize?client_id=${ARENA_CLIENT_ID}&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code`,
  [DROPBOX]: `https://www.dropbox.com/oauth2/authorize?client_id=${DROPBOX_CLIENT_ID}&response_type=code&redirect_uri=${CLIENT_HOST}/authorize/app/${DROPBOX}`
}

export const OAUTH1 = 'oAuth1'
export const OAUTH2 = 'oAuth2'

export const APP_AUTH_PROTOCOL = {
  [TRELLO]: OAUTH1,
  [GITHUB]: OAUTH2,
  [SLACK]: OAUTH2,
  [ARENA]: OAUTH2,
  [DROPBOX]: OAUTH2
}

const MORNING = '🌝'
const NIGHT = '🌚'

const calculateHoursToEmojis = () => {
  const hoursToEmoji = {}
  for (let i = 0; i < 24; i++) {
    const key = i < 10 ? `0${i}` : `${i}`
    if (i >= 19 || i <= 6) hoursToEmoji[key] = NIGHT
    else hoursToEmoji[key] = MORNING
  }
  return hoursToEmoji
}

export const hoursToEmoji = calculateHoursToEmojis()
