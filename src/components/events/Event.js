import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from '../../styled/components'

const Event = ({ data, type, user }) => {
  return (
    <EventObjectContainer>
      <EventSourceIcon></EventSourceIcon>
      <EventType>{type}</EventType>
      <EventAuthor>
        <Link>User: {user}</Link>
      </EventAuthor>
    </EventObjectContainer>
  )
}

Event.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
}

// Our erstwhile event object container! Wraps everything.
const EventObjectContainer = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 48px 120px 1fr 200px;
  align-items: center;
  max-width: 1024px;
  background: #eee;
  margin: 0.875rem 0rem;
  padding: 0.875rem;
  border-radius: 2px;
  box-shadow: 0px 0px 2px #999;
  grid-template-areas: 'eventsourceicon eventsource eventtype eventtype eventtype eventtype eventtype eventauthor';
`
// Icon for the EventSource e.g. GitHub, Slack, etc.
const EventSourceIcon = styled.div`
  grid-area: eventsourceicon;
  display: flex;
  justify-items: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background: #aaa;
  border-radius: 100px;
`

// Is it a bird? a plane? A commit message?
const EventType = styled.div`
  grid-area: eventtype;
`

const EventAuthor = styled.div`
  grid-area: eventauthor;
`

export default Event
