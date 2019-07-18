import React from 'react'
import PropTypes from 'prop-types'
import Event from './Event'
import { AlignItemsColumn } from '../../styled/components'

const EventList = ({ events }) => {
  return (
    <AlignItemsColumn>
      {events.map(event => {
        return <Event key={event.data.id} event={event} />
      })}
    </AlignItemsColumn>
  )
}

EventList.propTypes = {
  events: PropTypes.array.isRequired
}

export default EventList
