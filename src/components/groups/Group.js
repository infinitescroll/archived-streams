import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BR_PINK } from '../../styled/themes'
import { EventObjectContainer } from '../events/Event'
import { DATE_FORMAT, GITHUB } from '../../constants'
import { Events } from '../events'
import {
  eventHappenedToday,
  eventHappenedYesterday,
  eventHappenedLastWeek,
  eventHappenedLastMonth,
  filterEvents
} from '../../utils'
import { useFilters } from '../../hooks'

const Group = ({ title, endpoint, group }) => {
  const [open, setOpen] = useState(false)
  const [fetchedData, setFetchedData] = useState(false)
  const [events, setEvents] = useState({
    today: [],
    yesterday: [],
    lastWeek: [],
    lastMonth: [],
    catchAll: []
  })
  const [filteredEvents, setFilteredEvents] = useState({
    today: [],
    yesterday: [],
    lastWeek: [],
    lastMonth: [],
    catchAll: []
  })
  const { filters } = useFilters()

  const handleExpansion = async () => {
    if (!fetchedData) {
      try {
        const eventsFromGithub = {
          today: [],
          yesterday: [],
          lastWeek: [],
          lastMonth: [],
          catchAll: []
        }
        const { data } = await axios.get(`${endpoint}?per_page=25`)
        data.forEach(event => {
          let type
          if (group === 'issue') {
            type = event.event
          } else {
            type = event.type
          }
          const formattedEvent = {
            app: GITHUB,
            createdAt: dayjs(event.created_at).format(DATE_FORMAT),
            data: event,
            type,
            user: event.actor.login,
            id: event.id
          }

          const timeAgo = dayjs().to(dayjs(event.created_at))
          if (eventHappenedToday(timeAgo))
            eventsFromGithub.today.push(formattedEvent)
          else if (eventHappenedYesterday(timeAgo))
            eventsFromGithub.yesterday.push(formattedEvent)
          else if (eventHappenedLastWeek(timeAgo))
            eventsFromGithub.lastWeek.push(formattedEvent)
          else if (eventHappenedLastMonth(timeAgo))
            eventsFromGithub.lastMonth.push(formattedEvent)
          else eventsFromGithub.catchAll.push(formattedEvent)
        })
        setEvents(eventsFromGithub)
        const filteredEvents = {}
        Object.keys(eventsFromGithub).forEach(timeLabel => {
          filteredEvents[timeLabel] = eventsFromGithub[timeLabel].filter(
            filterEvents(filters)
          )
        })
        setFilteredEvents(filteredEvents)
        setOpen(!open)
        setFetchedData(true)
      } catch (error) {
        console.error(error)
        setEvents([])
      }
    }
  }

  useEffect(() => {
    const filteredEvents = {}
    Object.keys(events).forEach(timeLabel => {
      filteredEvents[timeLabel] = events[timeLabel].filter(
        filterEvents(filters)
      )
    })
    setFilteredEvents(filteredEvents)
  }, [events, filters])
  return (
    <GroupContainer onClick={() => handleExpansion()}>
      <h2>{title}</h2>
      <div style={{ display: open ? 'block' : 'none' }}>
        {open && <Events events={filteredEvents} />}
      </div>
    </GroupContainer>
  )
}
Group.propTypes = {
  title: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired
}
const GroupContainer = styled(EventObjectContainer)`
  background: ${BR_PINK};
  cursor: pointer;
  display: flex;
  flex-direction: column;
`

export default Group
