import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Octicon from 'react-octicon'
import dayjs from 'dayjs'
import { Event } from '../events/Event'
import {
  PUSH_EVENT,
  ISSUE_COMMENT_EVENT,
  ISSUES_EVENT,
  PULL_REQUEST_EVENT
} from '../../constants'
import { switchCases } from '../../utils'
import { EventListWrapper } from './EventList'
import {
  BR_PINK,
  BR_LILAC,
  BLUE,
  DARK_PURP,
  DARK_BLUE
} from '../../styled/themes'

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
        return <ResourceSummary resource={resource} />
      })}
    </EventListWrapper>
  )
}
TimeSummary.propTypes = {
  summary: PropTypes.object.isRequired
}

const ResourceSummary = ({ resource }) => {
  const [commentCount, setCommentCount] = useState(0)
  const [commitCount, setCommitCount] = useState(0)
  const [openClosedOrMerged, setOCM] = useState(null)
  const [isExpanded, setExpanded] = useState(false)

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
    <React.Fragment>
      <SummaryContainer
        onClick={() => setExpanded(!isExpanded)}
        style={{ backgroundColor: isExpanded ? BR_PINK : BR_LILAC }}
      >
        <SummaryIcon>
          <TypeIcon
            type={resource.type}
            openClosedOrMerged={openClosedOrMerged}
          />
        </SummaryIcon>
        <SummaryTitle>
          {typeToHumanReadable[resource.type](openClosedOrMerged)}
          {resource.title.indexOf('refs/head') > -1
            ? resource.title.substr(11, resource.title.length)
            : resource.title}
        </SummaryTitle>
        <SummaryItem>
          {commitCount > 0
            ? `${commitCount} ${commitCount > 1 ? 'Commits' : 'Commit'}`
            : ''}
          {commentCount > 0
            ? `${commentCount} ${commentCount > 1 ? 'Comments' : 'Comment'}`
            : ''}
        </SummaryItem>
        <DownArrow>{isExpanded ? '▼' : '►'}</DownArrow>
      </SummaryContainer>
      {isExpanded ? (
        <SummaryEvents>
          {resource.events.map(event => (
            <Event
              key={event.id}
              createdAt={event.createdAt}
              data={event.data}
              type={event.type}
              user={event.user}
            />
          ))}
        </SummaryEvents>
      ) : (
        ``
      )}
    </React.Fragment>
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

  return <Octicon style={{ color, margin: 'auto' }} mega name={name} />
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

export const SummaryContainer = styled.div`
  position: relative;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns:
    9rem 24rem auto
    10%;
  grid-gap: 1.5rem;
  align-items: center;
  max-width: 960px;
  background: ${BR_LILAC};
  margin: 0.875rem;
  padding: 0.875rem;
  border-radius: 4px;
  border: solid 2px ${BLUE};
  box-shadow: -3px 3px ${DARK_BLUE};
  grid-template-areas: 'icon resource summary arrow';
  font-size: 1rem;
  cursor: pointer;
  font-family: 'Lucida Console', Monaco, monospace;
  font-weight: bold;
  color: ${DARK_PURP};
`

const SummaryTitle = styled.div`
  grid-area: resource;
`

const SummaryItem = styled.div`
  grid-area: summary;
`

const SummaryIcon = styled.div`
  grid-area: icon;
`
const DownArrow = styled.span`
  font-size: 1.5rem;
  grid-area: arrow;
  position: absolute;
  right: 0;
`
const SummaryEvents = styled.div`
  margin-bottom: 3rem;
`
export default TimeSummary
