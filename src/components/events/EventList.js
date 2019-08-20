import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { EventColumns, Event } from './Event'

const EventList = ({ events, timeDelineation }) => (
  <EventListWrapper>
    <p>{timeDelineation}</p>
    <EventColumns />
    {events.map(event => (
      <Event
        key={event.id}
        createdAt={event.createdAt}
        data={event.data}
        type={event.type}
        user={event.user}
      />
    ))}
  </EventListWrapper>
)

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  timeDelineation: PropTypes.string
}

EventList.defaultProps = {
  timeDelineation: ''
}

const EventListWrapper = styled.section`
  width: 100%;

  & > :last-of-type {
    margin-bottom: 3px;
  }
`

export default EventList
