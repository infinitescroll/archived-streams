import React from 'react'
import styled from 'styled-components'
import { OWL_LOGO } from '../assets'
import { Title, Header, AlignItemsRow } from '../styled/components'
import { EventList } from '../components/events'
import Filters from '../components/filters'
import useStream from '../hooks/useStream'
import axios from 'axios'

const StreamContainer = styled(AlignItemsRow)`
  width: 100vw;
`

const Home = () => {
  const {
    events,
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess
  } = useStream()

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
        <button
          onClick={async () => {
            const jwt = ''
            const data = await axios.get(
              'http://localhost:3001/api/v0/auth/github',
              {
                headers: {
                  Authorization: 'Bearer ' + jwt,
                  'Access-Control-Allow-Origin': '*'
                }
              }
            )
            console.log(data)
          }}
        >
          auth me bitch
        </button>
        {loadingEvents && <p>Loading your events.....</p>}
        {loadedEvents && loadedEventsSuccess && <EventList events={events} />}
        {loadedEvents && loadedEventsSuccess && <Filters />}
      </StreamContainer>
    </Header>
  )
}

export default Home
