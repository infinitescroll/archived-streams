import React from 'react'
import useReactRouter from 'use-react-router'
import styled from 'styled-components'
import { useGitHubEvents } from '../hooks'

import { Title, GlobalStyle } from '../styled/components'
import { EventList } from '../components/events'

const StreamContainer = styled.section`
  display: grid;
  grid-column-templates: 1 / -1;
  justify-items: center;
  width: 100vw;
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
    <React.Fragment>
      <GlobalStyle />
      <StreamContainer>
        <div>
          <Title>Streams</Title>
        </div>
        {loadingEvents && <p>Loading your events.....</p>}
        {loadedEvents && loadedEventsSuccess && <EventList events={events} />}
      </StreamContainer>
    </React.Fragment>
  )
}
