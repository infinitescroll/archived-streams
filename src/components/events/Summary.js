import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import {
  PUSH_EVENT,
  ISSUE_COMMENT_EVENT,
  ISSUES_EVENT,
  PULL_REQUEST_EVENT
} from '../../constants'
import { BLUE_TRANSP, BR_LILAC, BLUE } from '../../styled/themes'
import { switchCases } from '../../utils'
import Octicon from 'react-octicon'

const TimeSummary = ({ summary }) => {
  const resources = sortResources(summary.resources)
  return (
    <SummaryContainer>
      {resources.map(resource => (
        <ResourceSummary resource={resource} />
      ))}
    </SummaryContainer>
  )
}

export const SummaryContainer = styled.div`
  position: relative;
  max-width: 960px;
  background: ${BR_LILAC};
  margin: 0.875rem;
  padding: 0.875rem;
  border-radius: 4px;
  border: solid 1px ${BLUE_TRANSP};
  box-shadow: -3px 3px ${BLUE};
  font-size: 1rem;
  font-family: 'Lucida Console', Monaco, monospace;
  cursor: pointer;
`

const Summary = styled.div`
  margin: 30px 0px;
`

const Type = styled.div`
  position: absolute;
  left: 90px;
`

const Title = styled.div`
  position: relative;
  left: 140px;
  font-weight: bold;
  text-decoration: underline;
`

const Summaries = styled.div`
  position: relative;
  left: 140px;
`

TimeSummary.propTypes = {
  summary: PropTypes.object.isRequired
}

const ResourceSummary = ({ resource }) => {
  const [commentCount, setCommentCount] = useState(0)
  const [commitCount, setCommitCount] = useState(0)
  const [openClosedOrMerged, setOCM] = useState(null)

  useEffect(() => {
    let localCommitCount = 0
    let localCommentCount = 0
    let localIsOpen = null
    let alreadyChecked = false

    const routeEvents = {
      [PUSH_EVENT]: event => {
        localCommitCount = localCommitCount + event.data.payload.commits.length
      },
      [ISSUE_COMMENT_EVENT]: event => {
        localCommentCount += 1
        if (!alreadyChecked) {
          event.data.payload.issue.state === 'open'
            ? (localIsOpen = 'Open')
            : (localIsOpen = 'Closed')
          alreadyChecked = true
        }
      },
      [ISSUES_EVENT]: event => {
        if (!alreadyChecked) {
          event.data.payload.issue.state === 'open'
            ? (localIsOpen = 'Open')
            : (localIsOpen = 'Closed')
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
  }, [resource, resource.events])

  return (
    <Summary>
      <Title>{resource.title}</Title>
      <Type>
        <TypeIcon
          type={resource.type}
          openClosedOrMerged={openClosedOrMerged}
        />
      </Type>
      <Summaries>
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
            {commentCount} {commentCount > 1 ? 'Comments' : 'Comment'}
          </p>
        ) : null}
      </Summaries>
    </Summary>
  )
}

const TypeIcon = ({ type, openClosedOrMerged }) => {
  let color
  let name
  const stateToColor = {
    Closed: 'red',
    Open: 'green',
    Merged: 'purple',
    null: 'grey'
  }
  const typeToName = {
    pullRequest: () => 'git-pull-request',
    issues: state => `issue${state.toLowerCase()}`,
    branches: () => 'git-branch'
  }
  const stateToName = {
    Open: '-opened',
    Closed: '-closed',
    null: '-opened'
  }
  color = stateToColor[openClosedOrMerged]
  name = typeToName[type](stateToName[openClosedOrMerged])

  return <Octicon style={{ color }} mega name={name} />
}

TypeIcon.propTypes = {
  openClosedOrMerged: PropTypes.string,
  type: PropTypes.string.isRequired
}

TypeIcon.defaultProps = {
  openClosedOrMerged: ''
}

ResourceSummary.propTypes = {
  resource: PropTypes.object.isRequired
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
