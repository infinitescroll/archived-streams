import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import EventList, { EventListDemo } from './EventList'

const Events = ({ events, summaries }) => (
  <Fragment>
    <EventListDemo />
    <EventList
      timeLabel="today"
      events={events.today}
      summary={summaries.today}
    />
    <EventList
      timeLabel="yesterday"
      events={events.yesterday}
      summary={summaries.yesterday}
    />
    <EventList
      timeLabel="in the past week"
      events={events.lastWeek}
      summary={summaries.lastWeek}
    />
    <EventList
      timeLabel="earlier this month"
      events={events.lastMonth}
      summary={summaries.lastMonth}
    />
    <EventList
      timeLabel="even older"
      events={events.catchAll}
      summary={summaries.catchAll}
    />
  </Fragment>
)

Events.propTypes = {
  events: PropTypes.object.isRequired,
  summaries: PropTypes.object.isRequired
}

export default Events
