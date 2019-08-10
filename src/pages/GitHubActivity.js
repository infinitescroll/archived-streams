import React from 'react'
import useReactRouter from 'use-react-router'
import styled from 'styled-components'
import { useGitHubEvents } from '../hooks'

import { Title } from '../styled/components'
import { EventList } from '../components/events'

const StreamContainer = styled.section`
  display: grid;
  grid-column-templates: 1 / -1;
  background: {BACKGROUND_LIGHT};
`

export default () => {
  const {
    match: {
      params: { owner, repo }
    }
  } = useReactRouter()
  const {
    events,
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess
  } = useGitHubEvents(owner, repo)

  return (
    <StreamContainer>
      <Title>Streams</Title>
      {loadingEvents && <p>Loading your events.....</p>}
      {loadedEvents && loadedEventsSuccess && <EventList events={events} />}
    </StreamContainer>
  )
}
