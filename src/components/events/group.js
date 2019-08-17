import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BR_PINK } from '../../styled/themes'
import { EventObjectContainer, Event } from './Event'

export const Group = ({ title, events }) => {
  const [open, setOpen] = useState(false)

  return (
    <GroupContainer onClick={() => setOpen(!open)}>
      <h2>{title}</h2>
      <div style={{ display: open ? 'block' : 'none' }}>
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
      </div>
    </GroupContainer>
  )
}
Group.propTypes = {
  title: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired
}
const GroupContainer = styled(EventObjectContainer)`
  background: ${BR_PINK};
  cursor: pointer;
  display: flex;
  flex-direction: column;
`
