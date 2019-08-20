import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import EventList, { EventListDemo } from './EventList'

const Events = ({ events }) => (
  <Fragment>
    <EventListDemo />
    <EventList timeLabel="Today" events={events.today} />
    <EventList timeLabel="Yesterday" events={events.yesterday} />
    <EventList timeLabel="Last Week" events={events.lastWeek} />
    <EventList timeLabel="Last Month" events={events.lastMonth} />
    <EventList events={events.catchAll} />
  </Fragment>
)

Events.propTypes = {
  events: PropTypes.object.isRequired
}

export default Events
