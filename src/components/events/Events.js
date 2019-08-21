import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import EventList, { EventListDemo } from './EventList'

const Events = ({ events }) => (
  <Fragment>
    <EventListDemo />
    <EventList timeLabel="in the past day" events={events.today} />
    <EventList timeLabel="a day or two ago" events={events.yesterday} />
    <EventList timeLabel="earlier this week" events={events.lastWeek} />
    <EventList timeLabel="earlier this month" events={events.lastMonth} />
    <EventList timeLabel="even older" events={events.catchAll} />
  </Fragment>
)

Events.propTypes = {
  events: PropTypes.object.isRequired
}

export default Events
