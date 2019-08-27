import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import {
  PUSH_EVENT,
  ISSUE_COMMENT_EVENT,
  ISSUES_EVENT,
  PULL_REQUEST_EVENT
} from '../../constants'
import { switchCases } from '../../utils'

const TimeSummary = ({ summary }) => {
  const resources = sortResources(summary.resources)

  return (
    <div>
      {resources.map(resource => ResourceSummary(resource))}
      {/* <p>{commitCount} commits</p>
      <p>{commentCount} comments</p> */}
    </div>
  )
}

TimeSummary.propTypes = {
  summary: PropTypes.object.isRequired
}

const ResourceSummary = resource => {
  const [commentCount, setCommentCount] = useState(0)
  const [commitCount, setCommitCount] = useState(0)
  const [openClosedOrMerged, setOCM] = useState(null)

  useMemo(() => {
    let localCommitCount = 0
    let localCommentCount = 0
    let localIsOpen
    let alreadyChecked = false

    const routeEvents = {
      [PUSH_EVENT]: event => {
        localCommitCount = localCommitCount + event.data.payload.commits.length
      },
      [ISSUE_COMMENT_EVENT]: () => {
        localCommentCount += 1
      },
      [ISSUES_EVENT]: event => {
        if (!alreadyChecked) {
          if (event.data.payload.action === 'closed') localIsOpen = 'Closed'
          else if (event.data.payload.action === 'opened') localIsOpen = 'Open'
          alreadyChecked = true
        }
      },
      [PULL_REQUEST_EVENT]: event => {
        if (!alreadyChecked) {
          if (event.data.payload.action === 'closed') {
            event.data.payload.pull_request.merged
              ? (localIsOpen = 'Merged')
              : (localIsOpen = 'Closed')
          } else if (event.data.payload.action === 'opened')
            localIsOpen = 'Open'

          alreadyChecked = true
        }
      }
    }
    const getSummaryOfEvents = switchCases(routeEvents)(() => {})

    const sortedEvents = sortResourceEvents(resource.events)
    sortedEvents.forEach(event => {
      getSummaryOfEvents(event.type)(event)
    })

    setOCM(localIsOpen)
    setCommitCount(localCommitCount)
    setCommentCount(localCommentCount)
  }, [resource.events])

  return (
    <div>
      <p>
        {openClosedOrMerged} {resource.type}
      </p>
      {commitCount > 0 ? (
        <p>
          {commitCount} {commitCount > 1 ? 'Commits' : 'Commit'}{' '}
        </p>
      ) : null}
      {commentCount > 0 ? (
        <p>
          {commitCount} {commentCount > 1 ? 'Comments' : 'Comment'}
        </p>
      ) : null}
    </div>
  )
}

const sortResourceEvents = events => {
  return events.sort((eventA, eventB) =>
    dayjs(eventA.createdAt).isAfter(dayjs(eventB.createdAt)) ? -1 : 1
  )
}
const sortResources = resources => {
  return resources.sort((resourceA, resourceB) =>
    dayjs(resourceA.events[0].createdAt).isAfter(resourceB.events[0].createdAt)
      ? -1
      : 1
  )
}
export default TimeSummary
