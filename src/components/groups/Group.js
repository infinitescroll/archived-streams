import React, { useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BR_PINK } from '../../styled/themes'
import { EventObjectContainer } from '../events/Event'
import { DATE_FORMAT, GITHUB } from '../../constants'
import { EventList } from '../events'

const Group = ({ title, endpoint }) => {
  const [open, setOpen] = useState(false)
  const [fetchedData, setFetchedData] = useState(false)
  const [events, setEvents] = useState([])

  const handleExpansion = async () => {
    if (!fetchedData) {
      try {
        const { data } = await axios.get(`${endpoint}?per_page=25`)
        setEvents(
          data.map(event => {
            return {
              app: GITHUB,
              createdAt: dayjs(event.created_at).format(DATE_FORMAT),
              data: event,
              type: event.event,
              user: event.actor.login
            }
          })
        )
        setOpen(!open)
        setFetchedData(true)
      } catch (error) {
        console.error(error)
        setEvents([])
      }
    }
  }
  return (
    <GroupContainer onClick={() => handleExpansion()}>
      <h2>{title}</h2>
      <div style={{ display: open ? 'block' : 'none' }}>
        <EventList events={events} />
      </div>
    </GroupContainer>
  )
}
Group.propTypes = {
  title: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired
}
const GroupContainer = styled(EventObjectContainer)`
  background: ${BR_PINK};
  cursor: pointer;
  display: flex;
  flex-direction: column;
`

export default Group
