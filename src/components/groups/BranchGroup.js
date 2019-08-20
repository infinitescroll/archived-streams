import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BR_PINK } from '../../styled/themes'
import { EventObjectContainer } from '../events/Event'
import { Events } from '../events'
import { filterEvents } from '../../utils'
import { useFilters } from '../../hooks'

const Group = ({ title, events }) => {
  const [open, setOpen] = useState(false)
  const [filteredEvents, setFilteredEvents] = useState({
    today: [],
    yesterday: [],
    lastWeek: [],
    lastMonth: [],
    catchAll: []
  })
  const { filters } = useFilters()

  useEffect(() => {
    const filteredEvents = {}

    Object.keys(events).forEach(timeDelineation => {
      filteredEvents[timeDelineation] = events[timeDelineation].filter(
        filterEvents(filters)
      )
    })
    setFilteredEvents(filteredEvents)
  }, [events, filters])
  return (
    <GroupContainer onClick={() => setOpen(!open)}>
      <h2>{title}</h2>
      <div style={{ display: open ? 'block' : 'none' }}>
        {open && <Events events={filteredEvents} />}
      </div>
    </GroupContainer>
  )
}
Group.propTypes = {
  title: PropTypes.string.isRequired,
  events: PropTypes.object.isRequired
}
const GroupContainer = styled(EventObjectContainer)`
  background: ${BR_PINK};
  cursor: pointer;
  display: flex;
  flex-direction: column;
`

export default Group
