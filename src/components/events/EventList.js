import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { EventColumns, EventType } from './Event'
import Summary from './Summary'
import { BLUE, BLUE_TRANSP } from '../../styled/themes'

const EventList = ({ events, summary, timeLabel }) => {
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
        {events.length === 0 ? (
          <EventListWrapper>
            <NoEvents>
              <p>No events fetched for this time period</p>
            </NoEvents>
          </EventListWrapper>
        ) : (
          <Summary summary={summary} isExpanded={!summaryViewActive} />
        )}
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
  summary: PropTypes.object.isRequired,
  timeLabel: PropTypes.string
}

EventList.defaultProps = {
  timeLabel: ''
}

export const EventListWrapper = styled.section`
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
