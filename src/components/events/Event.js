import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from '../../styled/components'
import { GITHUB, TRELLO } from '../../constants'

const calculateUser = (app, data) => {
  if (app === GITHUB) return data.actor.display_login
  if (app === TRELLO) return data.memberCreator.fullName
}

const Event = ({ event: { app, data } }) => {
  return (
    <EventObjectContainer>
      <EventSourceIcon></EventSourceIcon>
      <EventSource>{app}</EventSource>
      <EventType>{data.type}</EventType>
      <EventAuthor>
        <Link>User: {calculateUser(app, data)}</Link>
      </EventAuthor>
    </EventObjectContainer>
  )
}

Event.propTypes = {
  event: PropTypes.object.isRequired
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

// The 3rd party service that's producing the event e.g. GitHub, Slack
const EventSource = styled.div`
  grid-area: eventsource;
  text-transform: uppercase;
`

// Is it a bird? a plane? A commit message?
const EventType = styled.div`
  grid-area: eventtype;
`

const EventAuthor = styled.div`
  grid-area: eventauthor;
`

export default Event
