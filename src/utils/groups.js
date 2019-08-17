import dayjs from 'dayjs'
import {
  DATE_FORMAT,
  PUSH_EVENT,
  PULL_REQUEST_EVENT,
  PULL_REQUEST_REVIEW_COMMENT_EVENT,
  ISSUES_EVENT,
  ISSUE_COMMENT_EVENT
  // CREATE_EVENT,
  // DELETE_EVENT,
  // WATCH_EVENT,
  // FORK_EVENT,
  // MEMBER_EVENT,
  // RELEASE_EVENT
} from '../constants'

export const getGroupFromUrlBar = params => {
  return params.get('groupby') || ''
}

export const groupify = (database, event) => {
  if (!database.users[event.actor.id]) {
    database.users[event.actor.id] = {
      eventsUrl: `${event.actor.url}/events`,
      id: event.actor.id,
      user: event.actor.display_login
    }
  }
  switch (event.type) {
    case ISSUES_EVENT:
      {
        const issue = event.payload.issue
        if (!database.issues[issue.id]) {
          database.issues[issue.id] = {
            eventsUrl: issue.events_url,
            createdAt: dayjs(event.created_at).format(DATE_FORMAT),
            title: issue.title,
            labels: issue.labels,
            id: issue.id
          }
        }
      }
      break
    case ISSUE_COMMENT_EVENT:
      {
        const issue = event.payload.issue

        if (!database.issues[issue.id]) {
          database.issues[issue.id] = {
            eventsUrl: issue.events_url,
            createdAt: dayjs(event.created_at).format(DATE_FORMAT),
            title: issue.title,
            labels: issue.labels,
            id: issue.id
          }
        }

        const pullRequest = issue.pull_request
        if (pullRequest) {
          console.log('issue comment event in PR', event)
        }
      }
      break

    case PUSH_EVENT: {
      console.log('push event', event)
      break
    }
    case PULL_REQUEST_EVENT: {
      console.log('pr event', event)
      break
    }
    case PULL_REQUEST_REVIEW_COMMENT_EVENT: {
      console.log('pr review', event)
      break
    }
  }
}
