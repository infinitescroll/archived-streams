import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import EventList from './EventList'

const Events = ({ events }) => (
  <Fragment>
    <EventList timeDelineation="Today" events={events.today} />
    <EventList timeDelineation="Yesterday" events={events.yesterday} />
    <EventList timeDelineation="Last week" events={events.lastWeek} />
    <EventList timeDelineation="Last Month" events={events.lastMonth} />
    <EventList events={events.catchAll} />
  </Fragment>
)

Events.propTypes = {
  events: PropTypes.object.isRequired
}

export default Events
