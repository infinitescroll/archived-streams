import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Event, EventColumns } from './Event'

const EventList = ({ events }) => {
  return (
    <EventListWrapper>
      <EventColumns />
      {events.map(event => {
        return (
          <Event
            key={event.data.id}
            createdAt={event.createdAt}
            data={event.data}
            type={event.type}
            user={event.user}
          />
        )
      })}
    </EventListWrapper>
  )
}

EventList.propTypes = {
  events: PropTypes.array.isRequired
}

const EventListWrapper = styled.section`
  width: 100%;
  justify-content: center;
  justify-self: center;

  & > :last-of-type {
    margin-bottom: 3px;
  }
`

export default EventList
