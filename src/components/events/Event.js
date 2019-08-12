import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from '../../styled/components'
import {
  DARK_PURP,
  DARK_BLUE,
  BR_LILAC,
  BLUE,
  BLUE_TRANSP
} from '../../styled/themes'
import { timeToEmoji, getEventMessage } from '../../utils'
import ReactHtmlParser from 'react-html-parser'

const Event = ({ data, type, user, createdAt }) => {
  return (
    <EventObjectContainer>
      <EventAuthor>
        <Link>{user}</Link>
      </EventAuthor>
      <EventType>{ReactHtmlParser(getEventMessage(data))}</EventType>
      <EventTime>{timeToEmoji(createdAt)}</EventTime>
    </EventObjectContainer>
  )
}

Event.propTypes = {
  createdAt: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
}

// Our erstwhile event object container! Wraps everything.
const EventObjectContainer = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 48px 0.25fr 1fr 10%;
  align-items: center;
  max-width: 1024px;
  background: ${BR_LILAC};
  margin: 0.875rem;
  padding: 0.875rem;
  border-radius: 4px;
  border: solid 1px ${BLUE_TRANSP};
  box-shadow: -3px 3px ${BLUE};
  grid-template-areas: 'eventauthor eventauthor eventtype eventtype eventtype eventtime';
  contain: paint;

  &:first-child {
    margin-top: 0;
  }
`
// Icon for the EventSource e.g. GitHub, Slack, etc.
// const EventSourceIcon = styled.div`
//   grid-area: eventsourceicon;
//   display: flex;
//   justify-items: center;
//   align-items: center;
//   width: 24px;
//   height: 24px;
//   background: ${BR_LILAC};
//   border-radius: 100px;
// `

// Is it a bird? a plane? A commit message?
const EventType = styled.div`
  grid-area: eventtype;
  color: ${DARK_PURP};
  font-family: 'Lucida Console', Monaco, monospace;
  padding-right: 2rem;
  & a {
    color: ${DARK_BLUE};
    text-decoration: none;
    &:hover {
      color: ${BLUE};
      text-decoration: underline;
    }
  }
`

const EventAuthor = styled.div`
  grid-area: eventauthor;
  font-weight: bold;
  font-family: Futura, Segoe UI, 'system-ui', sans-serif;
  & a {
    color: ${DARK_BLUE};
    &:hover {
      color: ${BLUE};
      text-decoration: underline;
    }
  }
`

const EventTime = styled.div`
  position: absolute;
  font-size: 0.875rem;
  top: 0.875rem;
  right: 0.875rem;
`

export default Event
