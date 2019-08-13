import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Event from './Event'
import { BLUE_TRANSP } from '../../styled/themes'

const EventList = ({ events }) => {
  return (
    <EventListWrapper>
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
  min-width: 320px;
  max-width: 960px;
  width: 100%;
  justify-content: center;
  justify-self: center;
  border-left: 0.125rem dashed ${BLUE_TRANSP};
`

export default EventList
