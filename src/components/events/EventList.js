import React, { Fragment, useState, useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Event, EventColumns, EventType } from './Event'
import { BLUE, BLUE_TRANSP } from '../../styled/themes'
import { PUSH_EVENT, ISSUE_COMMENT_EVENT, ISSUES_EVENT } from '../../constants'

const Summary = ({ events }) => {
  // could batch these into one setState or useReducer but as long as the `useMemo` is syncronous it shouldnt cause unecessary rerenders https://github.com/facebook/react/issues/14259
  const [commitCount, setCommitCount] = useState(0)
  const [commentCount, setCommentCount] = useState(0)

  useMemo(() => {
    let commitCount = 0
    let commentCount = 0
    events.forEach(event => {
      if (event.type === PUSH_EVENT)
        commitCount += event.data.payload.commits.length
      if (event.type === ISSUE_COMMENT_EVENT) commentCount += 1
      if (event.type === ISSUES_EVENT) console.log('issue event', event.data)
    })
    setCommitCount(commitCount)
    setCommentCount(commentCount)
  }, [events])

  return (
    <div>
      <p>{commitCount} commits</p>
      <p>{commentCount} comments</p>
    </div>
  )
}

Summary.propTypes = {
  events: PropTypes.array.isRequired
}

const EventList = ({ events, timeLabel }) => {
  console.log('EVENTS', events, timeLabel)
  const [summaryViewActive, setSummaryViewActive] = useState(true)
  return (
    <Fragment>
      <EventsTimeWrapper>
        <TimeLabel
          onClick={e => {
            e.stopPropagation()
            setSummaryViewActive(!summaryViewActive)
          }}
        >
          {timeLabel}
        </TimeLabel>
        <EventListWrapper>
          {events.length === 0 ? (
            <NoEvents>
              <p>No events fetched for this time period</p>
            </NoEvents>
          ) : summaryViewActive ? (
            <Summary events={events} />
          ) : (
            events.map(event => (
              <Event
                key={event.id}
                createdAt={event.createdAt}
                data={event.data}
                type={event.type}
                user={event.user}
              />
            ))
          )}
        </EventListWrapper>
      </EventsTimeWrapper>
    </Fragment>
  )
}

export const EventListDemo = () => (
  <EventsTimeWrapper>
    <TimeLabel />
    <EventListWrapper style={{ border: 'none' }}>
      <EventColumns />
    </EventListWrapper>
  </EventsTimeWrapper>
)

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  timeLabel: PropTypes.string
}

EventList.defaultProps = {
  timeLabel: ''
}

const EventListWrapper = styled.section`
  border-left: 0.125rem dashed ${BLUE_TRANSP};
  min-width: 320px;
  max-width: 900px;
  width: 100%;

  & > :last-of-type {
    margin-bottom: 3px;
  }
  & > :first-of-type {
    margin-top: 0;
  }
`
export const TimeLabel = styled(EventType)`
  width: 6rem;
  color: ${BLUE};
  text-align: right;
  padding-right: 0.875rem;
`

const EventsTimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3rem;
  width: 100%;
  justify-content: center;
`

const NoEvents = styled(EventType)`
  margin: 1.5rem;
`

export default EventList
