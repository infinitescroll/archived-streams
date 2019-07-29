import React from 'react'
import styled from 'styled-components'
// import { OWL_LOGO } from '../assets'
import { Title } from '../styled/components'
// import { BACKGROUND_LIGHT } from '../styled/themes'
import { EventList } from '../components/events'
import Filters from '../components/filters'
import useStream from '../hooks/useStream'

const StreamContainer = styled.section`
  display: grid;
  grid-column-templates: 1 / -1;
  background: {BACKGROUND_LIGHT};
`

const Home = () => {
  const {
    events,
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess
  } = useStream()

  return (
    <StreamContainer>
      <Title>Streams</Title>
      {loadingEvents && <p>Loading your events.....</p>}
      {loadedEvents && loadedEventsSuccess && <EventList events={events} />}
      {loadedEvents && loadedEventsSuccess && <Filters />}
    </StreamContainer>
  )
}

export default Home
