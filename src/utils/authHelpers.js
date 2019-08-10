import { GITHUB, SLACK } from '../constants'

export const authHeader = jwt => {
  return {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }
}

export const generateAuthQueryParams = (queryParam, value) => {
  return `${queryParam}=${value}`
}

export const generateAppParams = (app, token) => {
  switch (app) {
    case GITHUB: {
      return {
        params: {
          sort: 'updated'
        },
        headers: {
          Authorization: `token ${token}`
        }
      }
    }
    case SLACK: {
      return {
        params: {
          exclude_archived: 'true',
          token: token
        }
      }
    }
  }
}
