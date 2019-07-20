import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { OWL_LOGO } from '../assets'
import { Title, Header, AlignItemsRow } from '../styled/components'
import { EventList } from '../components/events'
import {
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError
} from '../store/actions'
import mockStreamServer from '../mockStreamsServer'
import { DATE_FORMAT } from '../constants'

const StreamContainer = styled(AlignItemsRow)`
  width: 100vw;
`

const Home = ({
  events,
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError
}) => {
  useEffect(() => {
    document.body.classList.add('background-light')
    const requestStreams = async () => {
      requestedStreamEvents()
      await mockStreamServer.fetchEvents()
      try {
        requestedStreamEventsSuccess(mockStreamServer.getEvents())
      } catch (error) {
        requestedStreamEventsError(error)
      }
    }

    requestStreams()
  }, [
    requestedStreamEvents,
    requestedStreamEventsSuccess,
    requestedStreamEventsError
  ])

  return (
    <Header>
      <StreamContainer>
        <div style={{ marginLeft: '56px', marginRight: '28px' }}>
          <Title>Welcome to Streams!</Title>
          <img
            src={OWL_LOGO}
            style={{ height: '200px', width: 'auto' }}
            alt="logo"
          />
        </div>
        <EventList events={events} />
      </StreamContainer>
      <button
        onClick={() => {
          console.log(
            // dayjs('2019-01-19T17:48:44-05:00').isBefore(
            //   dayjs('2019-07-19T05:28:15-04:00')
            // )

            dayjs().format(DATE_FORMAT)
          )
        }}
      >
        click
      </button>
    </Header>
  )
}

Home.propTypes = {
  events: PropTypes.array.isRequired,
  requestedStreamEvents: PropTypes.func.isRequired,
  requestedStreamEventsSuccess: PropTypes.func.isRequired,
  requestedStreamEventsError: PropTypes.func.isRequired
}

const mapStateToProps = ({ events }) => {
  return {
    events: events.data
  }
}

const mapDispatchToProps = {
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
