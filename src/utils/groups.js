import dayjs from 'dayjs'
import { DATE_FORMAT, ISSUES_EVENT, ISSUE_COMMENT_EVENT } from '../constants'

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
      }
      break
  }
}

export const eventHappenedToday = timeAgo => timeAgo.indexOf('hours') > -1

export const eventHappenedYesterday = timeAgo =>
  timeAgo.indexOf('a day ago') > -1

export const eventHappenedLastWeek = timeAgo =>
  timeAgo.indexOf('2 days ago') > -1 ||
  timeAgo.indexOf('3 days ago') > -1 ||
  timeAgo.indexOf('4 days ago') > -1 ||
  timeAgo.indexOf('5 days ago') > -1 ||
  timeAgo.indexOf('6 days ago') > -1 ||
  timeAgo.indexOf('7 days ago') > -1

export const eventHappenedLastMonth = timeAgo => timeAgo.indexOf('days ago')
