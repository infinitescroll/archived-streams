import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { EventColumns } from './Event'
import { Group } from './group'
import { groupBy } from '../../utils/groups'

const EventList = ({ events, type }) => {
  const groupedEvents = groupBy(type, events)

  return (
    <EventListWrapper>
      <EventColumns />
      {groupedEvents.map(events => {
        return <Group title={events[0].user} events={events} />
      })}
    </EventListWrapper>
  )
}

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
}

const EventListWrapper = styled.section`
  width: 100%;

  & > :last-of-type {
    margin-bottom: 3px;
  }
`

export default EventList
