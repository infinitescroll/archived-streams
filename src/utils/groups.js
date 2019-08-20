import dayjs from 'dayjs'
import {
  DATE_FORMAT,
  ISSUES_EVENT,
  ISSUE_COMMENT_EVENT,
  PUSH_EVENT,
  PULL_REQUEST_EVENT,
  PULL_REQUEST_REVIEW_COMMENT_EVENT,
  CREATE_EVENT,
  DELETE_EVENT,
  GITHUB
} from '../constants'

export const getGroupFromUrlBar = params => {
  return params.get('groupby') || ''
}

export const formBranchNameFromRef = ref => {
  if (ref.indexOf('refs/heads') > -1) return ref
  return `refs/heads/${ref}`
}

export const formatAndGroupByTime = (
  database,
  type,
  identifier,
  event,
  title = ''
) => {
  if (!database[type][identifier]) {
    database[type][identifier] = {
      title,
      events: {
        today: [],
        yesterday: [],
        lastWeek: [],
        lastMonth: [],
        catchAll: []
      }
    }
  }

  const formattedEvent = {
    app: GITHUB,
    createdAt: dayjs(event.created_at).format(DATE_FORMAT),
    data: event,
    type: event.type,
    user: event.actor.login,
    id: event.id
  }

  const timeAgo = dayjs().to(dayjs(event.created_at))
  if (eventHappenedToday(timeAgo))
    database[type][identifier].events.today.push(formattedEvent)
  else if (eventHappenedYesterday(timeAgo))
    database[type][identifier].events.yesterday.push(formattedEvent)
  else if (eventHappenedLastWeek(timeAgo))
    database[type][identifier].events.lastWeek.push(formattedEvent)
  else if (eventHappenedLastMonth(timeAgo))
    database[type][identifier].events.lastMonth.push(formattedEvent)
  else database[type][identifier].events.catchAll.push(formattedEvent)
}

export const groupify = (database, event) => {
  formatAndGroupByTime(
    database,
    'users',
    event.actor.id,
    event,
    event.actor.display_login
  )
  switch (event.type) {
    case ISSUES_EVENT:
      {
        const { id, title, pull_request } = event.payload.issue
        // only show issue if it wasn't part of a PR
        if (!pull_request)
          formatAndGroupByTime(database, 'issues', id, event, title)
      }
      break
    case ISSUE_COMMENT_EVENT:
      {
        const { id, title, pull_request } = event.payload.issue
        // only show issue if it wasn't part of a PR
        if (!pull_request)
          formatAndGroupByTime(database, 'issues', id, event, title)
      }
      break

    case PUSH_EVENT: {
      const { ref } = event.payload
      const branchName = formBranchNameFromRef(ref)
      formatAndGroupByTime(database, 'branches', branchName, event)
      break
    }
    case PULL_REQUEST_EVENT: {
      const branchName = formBranchNameFromRef(
        event.payload.pull_request.head.ref
      )
      formatAndGroupByTime(database, 'branches', branchName, event)
      break
    }
    case PULL_REQUEST_REVIEW_COMMENT_EVENT: {
      const branchName = formBranchNameFromRef(
        event.payload.pull_request.head.ref
      )
      formatAndGroupByTime(database, 'branches', branchName, event)
      break
    }
    case CREATE_EVENT:
    case DELETE_EVENT: {
      const { ref, ref_type } = event.payload
      if (ref_type === 'branch') {
        const branchName = formBranchNameFromRef(ref)
        formatAndGroupByTime(database, 'branches', branchName, event)
      }
      break
    }
    default: {
      break
    }
  }
}

export const eventHappenedToday = timeAgo =>
  timeAgo.indexOf('hour') > -1 || timeAgo.indexOf('minute') > -1

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
