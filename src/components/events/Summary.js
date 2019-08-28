import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import uuidv1 from 'uuid/v1'
import Octicon from 'react-octicon'
import dayjs from 'dayjs'
import { Event, EventObjectContainer } from '../events/Event'
import {
  PUSH_EVENT,
  ISSUE_COMMENT_EVENT,
  ISSUES_EVENT,
  PULL_REQUEST_EVENT
} from '../../constants'
import { switchCases } from '../../utils'
import { EventListWrapper } from './EventList'

const TimeSummary = ({ summary }) => {
  const resources = sortResources(summary.resources)
  return (
    <EventListWrapper>
      {resources.map(resource => {
        if (
          resource.events.length === 1 &&
          resource.events[0].type === 'DeleteEvent'
        )
          return
        return <ResourceDisplay resource={resource} />
      })}
    </EventListWrapper>
  )
}
TimeSummary.propTypes = {
  summary: PropTypes.object.isRequired
}

const ResourceDisplay = ({ resource }) => {
  const [expanded, setExpanded] = useState(false)

  return expanded ? (
    <ResourceEventLog
      key={uuidv1()}
      resource={resource}
      click={e => {
        e.stopPropagation()
        setExpanded(false)
      }}
    />
  ) : (
    <SummariesList
      key={uuidv1()}
      onClick={e => {
        e.stopPropagation()
        setExpanded(true)
      }}
    >
      <ResourceSummary resource={resource} />
    </SummariesList>
  )
}
ResourceDisplay.propTypes = {
  resource: PropTypes.object.isRequired
}

const ResourceEventLog = ({ resource, click }) => {
  const [openClosedOrMerged, setOCM] = useState(null)

  useEffect(() => {
    let localIsOpen = null
    let alreadyChecked = false

    const routeEvents = {
      [ISSUE_COMMENT_EVENT]: event => {
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
  }, [resource, resource.events])

  return (
    <SummaryList>
      <SummaryHeader onClick={click}>
        <div>
          <TypeIcon
            type={resource.type}
            openClosedOrMerged={openClosedOrMerged}
          />
        </div>
        <div style={{ textDecoration: 'underline' }}>
          {typeToHumanReadable[resource.type](openClosedOrMerged)}
          {resource.title.indexOf('refs/head') > -1
            ? resource.title.substr(11, resource.title.length)
            : resource.title}
        </div>
      </SummaryHeader>
      {resource.events.map(event => (
        <Event
          key={event.id}
          createdAt={event.createdAt}
          data={event.data}
          type={event.type}
          user={event.user}
        />
      ))}
    </SummaryList>
  )
}
ResourceEventLog.propTypes = {
  resource: PropTypes.object.isRequired,
  click: PropTypes.func.isRequired
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

  if (resource.type === 'branches' && openClosedOrMerged !== null) return null

  return (
    <SummaryContainer>
      <Type>
        <TypeIcon
          type={resource.type}
          openClosedOrMerged={openClosedOrMerged}
        />
      </Type>
      <Title>
        {typeToHumanReadable[resource.type](openClosedOrMerged)}
        {resource.title.indexOf('refs/head') > -1
          ? resource.title.substr(11, resource.title.length)
          : resource.title}
      </Title>
      <Summaries>
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
    </SummaryContainer>
  )
}
ResourceSummary.propTypes = {
  resource: PropTypes.object.isRequired
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
    pullRequestObj: () => 'git-pull-request',
    issues: state => `issue${state.toLowerCase()}`,
    branches: () => 'git-branch'
  }

  const stateToName = {
    Open: '-opened',
    Closed: '-closed',
    null: '-opened'
  }

  color = stateToColor[openClosedOrMerged]
  name = typeToName[type](stateToName[openClosedOrMerged] || '')

  return <Octicon style={{ color }} mega name={name} />
}

TypeIcon.propTypes = {
  openClosedOrMerged: PropTypes.string,
  type: PropTypes.string.isRequired
}

TypeIcon.defaultProps = {
  openClosedOrMerged: null
}

const typeToHumanReadable = {
  pullRequestObj: state => `${state} Pull Request: `,
  issues: state => `${state} Issue: `,
  branches: _state => 'New Branch: '
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

export const SummaryContainer = styled(EventObjectContainer)`
  cursor: pointer;
  display: block;
  margin: 0 0 0.875rem 0.875rem;
  font-family: 'Lucida Console', Monaco, monospace;
`

const Type = styled.div`
  position: absolute;
  left: 90px;
`

const Title = styled.div`
  position: relative;
  left: 140px;
  font-weight: bold;
`

const Summaries = styled.div`
  position: relative;
  left: 140px;
`

const SummaryHeader = styled.div`
  position: relative;
  margin: 0 0.875rem;
  font-size: 1rem;
  font-family: 'Lucida Console', Monaco, monospace;
  display: flex;
  text-align: center;
  cursor: pointer;
`
const SummariesList = styled.div`
  margin: 0.875rem 0;
  min-width: 320px;
  max-width: 900px;
  width: 100%;

  & :last-of-type {
    margin-bottom: 3px;
  }
`
const SummaryList = styled.div`
  min-width: 320px;
  max-width: 900px;
  width: 100%;
  margin: 4.5rem 0;
`
export default TimeSummary
