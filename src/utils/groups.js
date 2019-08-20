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

export const formatAndGroupByTime = (database, branchName, event) => {
  if (!database.branches[branchName]) {
    database.branches[branchName] = {
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
    database.branches[branchName].events.today.push(formattedEvent)
  else if (eventHappenedYesterday(timeAgo))
    database.branches[branchName].events.yesterday.push(formattedEvent)
  else if (eventHappenedLastWeek(timeAgo))
    database.branches[branchName].events.lastWeek.push(formattedEvent)
  else if (eventHappenedLastMonth(timeAgo))
    database.branches[branchName].events.lastMonth.push(formattedEvent)
  else database.branches[branchName].events.catchAll.push(formattedEvent)
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

    case PUSH_EVENT: {
      const { ref } = event.payload
      const branchName = formBranchNameFromRef(ref)
      formatAndGroupByTime(database, branchName, event)
      break
    }
    case PULL_REQUEST_EVENT: {
      const branchName = formBranchNameFromRef(
        event.payload.pull_request.head.ref
      )
      formatAndGroupByTime(database, branchName, event)
      break
    }
    case PULL_REQUEST_REVIEW_COMMENT_EVENT: {
      const branchName = formBranchNameFromRef(
        event.payload.pull_request.head.ref
      )
      formatAndGroupByTime(database, branchName, event)
      break
    }
    case CREATE_EVENT:
    case DELETE_EVENT: {
      const { ref, ref_type } = event.payload
      if (ref_type === 'branch') {
        const branchName = formBranchNameFromRef(ref)
        formatAndGroupByTime(database, branchName, event)
      }
      break
    }
    default: {
      break
    }
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
