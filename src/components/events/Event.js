import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from '../../styled/components'
import dayjs from 'dayjs'

import {
  DARK_PURP,
  DARK_BLUE,
  MID_BLUE,
  BR_LILAC,
  BLUE,
  BLUE_TRANSP
} from '../../styled/themes'
import { timeToEmoji, getEventMessage } from '../../utils'
import ReactHtmlParser from 'react-html-parser'

// Our erstwhile event object container! Wraps everything.
export const EventObjectContainer = styled.div`
  position: relative;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns:
    minmax(5rem, max-content) 3rem auto
    10%;
  grid-gap: 1.5rem;
  align-items: center;
  max-width: 1024px;
  background: ${BR_LILAC};
  margin: 0.875rem;
  padding: 0.875rem;
  border-radius: 4px;
  border: solid 1px ${BLUE_TRANSP};
  box-shadow: -3px 3px ${BLUE};
  grid-template-areas: 'eventauthor eventauthor eventtype eventtype eventtype eventtime';
  font-size: 1.125rem;
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
export const EventType = styled.div`
  grid-area: eventtype;
  color: ${DARK_PURP};
  font-family: 'Lucida Console', Monaco, monospace;
  padding-right: 2rem;
  & a {
    color: ${MID_BLUE};
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
  top: 0.875rem;
  right: 0.875rem;

  & span {
    display: none;
  }
  &:hover span {
    display: block;
  }
`

const TimeHover = styled.span`
  position: absolute;
  top: -30%;
  right: -30%;
  padding: 0.5rem;
  z-index: 5;
  text-align: center;
  white-space: nowrap;

  color: ${BR_LILAC};
  background-color: ${DARK_PURP};
  opacity: 0.8;
  border-radius: 0.5rem;
  box-shadow: 3px 3px ${BLUE};
  font-family: 'Lucida Console', Monaco, monospace;

  min-width: 5rem;
  width: auto;
`
export const Event = ({ data, type, user, createdAt }) => {
  const time = () => {
    const day = dayjs(createdAt).format('ddd')
    const hour = dayjs(createdAt).format('H')
    const minute = dayjs(createdAt).format('mm')
    return `${day} ${hour}:${minute}`
  }

  return (
    <EventObjectContainer>
      <EventAuthor>
        <Link>{user}</Link>
      </EventAuthor>
      <EventType>{ReactHtmlParser(getEventMessage(data))}</EventType>
      <EventTime>
        {timeToEmoji(createdAt)}
        <TimeHover>{time()}</TimeHover>
      </EventTime>
    </EventObjectContainer>
  )
}

Event.propTypes = {
  createdAt: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
}

const EventLabelContainer = styled(EventObjectContainer)`
  margin-top: 3rem;
  background: none;
  border: none;
  border: 2px dashed ${BLUE_TRANSP};
  box-shadow: none;
`
export const EventColumns = () => {
  return (
    <EventLabelContainer>
      <EventAuthor>
        <Link>[ user ]</Link>
      </EventAuthor>
      <EventType>[ event type ]</EventType>
      <EventTime>
        ⏰<TimeHover>[ time ]</TimeHover>
      </EventTime>
    </EventLabelContainer>
  )
}
