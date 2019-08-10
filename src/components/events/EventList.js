import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Event from './Event'

const EventList = ({ events }) => {
  return (
    <EventListWrapper>
      {events.map(event => {
        return <Event key={event.data.id} event={event} />
      })}
    </EventListWrapper>
  )
}

EventList.propTypes = {
  events: PropTypes.array.isRequired
}

const EventListWrapper = styled.section`
  display: grid;
  grid-template-columns: minmax(320px, 1024px);
  justify-content: center;
`

export default EventList
