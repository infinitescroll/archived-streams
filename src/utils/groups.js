import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
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

dayjs.extend(calendar)

export const getGroupFromUrlBar = params => {
  return params.get('groupby') || ''
}

export const formBranchNameFromRef = ref => {
  if (ref.indexOf('refs/heads') > -1) return ref
  return `refs/heads/${ref}`
}

const checkIfPartOfPR = (event, pulls) => {
  let match = null

  Object.keys(pulls).forEach(id => {
    // ?????????????????????????????????????????????
    if (!pulls[id].head) return

    const pullBranch = formBranchNameFromRef(pulls[id].head.ref)
    const eventBranch = formBranchNameFromRef(event.payload.ref)
    if (pullBranch === eventBranch) {
      match = id
    }
  })
  return match
}

const createMetadataByType = (type, title, event) => {
  let associatedGitHubEndpoint = ''
  // we never have type pullRequestObj in here bc we already created metadata for each PR when fetching directly from the PR endpoint on github
  switch (type) {
    case 'branches':
      if (event.payload.ref_type === 'branch')
        associatedGitHubEndpoint = `https://github.com/openworklabs/streams/tree/${event.payload.ref}`
      break
    case 'issues':
      associatedGitHubEndpoint = event.payload.issue.html_url
      break
    default:
      associatedGitHubEndpoint = ''
      break
  }

  return {
    title,
    type,
    url: associatedGitHubEndpoint,
    events: {
      today: [],
      yesterday: [],
      lastWeek: [],
      lastMonth: [],
      catchAll: []
    }
  }
}

export const formatAndGroupByTime = (
  database,
  type,
  identifier,
  event,
  title = ''
) => {
  if (!database[type][identifier]) {
    database[type][identifier] = createMetadataByType(type, title, event)
  }

  const formattedEvent = {
    app: GITHUB,
    createdAt: dayjs(event.created_at).format(DATE_FORMAT),
    data: event,
    type: event.type,
    user: event.actor.login,
    id: event.id
  }

  const calendarTime = dayjs(event.created_at).calendar(dayjs())
  if (eventHappenedToday(calendarTime))
    database[type][identifier].events.today.push(formattedEvent)
  else if (eventHappenedYesterday(calendarTime))
    database[type][identifier].events.yesterday.push(formattedEvent)
  else if (eventHappenedLastWeek(calendarTime))
    database[type][identifier].events.lastWeek.push(formattedEvent)
  else if (eventHappenedLastMonth(calendarTime))
    database[type][identifier].events.lastMonth.push(formattedEvent)
  else database[type][identifier].events.catchAll.push(formattedEvent)
}

export const groupify = (database, event, pulls) => {
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
      formatAndGroupByTime(database, 'branches', branchName, event, branchName)
      const prId = checkIfPartOfPR(event, database.pullRequestObj)
      if (prId) {
        formatAndGroupByTime(database, 'pullRequestObj', prId, event)
      }
      break
    }
    case PULL_REQUEST_EVENT: {
      const branchName = formBranchNameFromRef(
        event.payload.pull_request.head.ref
      )
      formatAndGroupByTime(database, 'branches', branchName, event, branchName)
      formatAndGroupByTime(
        database,
        'pullRequestObj',
        event.payload.pull_request.id,
        event
      )
      break
    }
    case PULL_REQUEST_REVIEW_COMMENT_EVENT: {
      const branchName = formBranchNameFromRef(
        event.payload.pull_request.head.ref
      )
      formatAndGroupByTime(database, 'branches', branchName, event, branchName)
      formatAndGroupByTime(
        database,
        'pullRequestObj',
        event.payload.pull_request.id,
        event
      )
      break
    }
    case CREATE_EVENT:
    case DELETE_EVENT: {
      const { ref, ref_type } = event.payload
      if (ref_type === 'branch') {
        const branchName = formBranchNameFromRef(ref)
        formatAndGroupByTime(
          database,
          'branches',
          branchName,
          event,
          branchName
        )
      }
      break
    }
    default: {
      break
    }
  }
}

export const eventHappenedToday = timeAgo => timeAgo.indexOf('Today') > -1

export const eventHappenedYesterday = timeAgo =>
  timeAgo.indexOf('Yesterday') > -1

export const eventHappenedLastWeek = timeAgo => timeAgo.indexOf('Last') > -1

export const eventHappenedLastMonth = timeAgo =>
  timeAgo.split('/')[0] === dayjs().format('MM')
