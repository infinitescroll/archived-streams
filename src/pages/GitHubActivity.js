import React from 'react'
import styled from 'styled-components'
import { useGitHubEvents } from '../hooks'

import { Title, GlobalStyle, ViewContainer, Link } from '../styled/components'
import { EventList } from '../components/events'
import Filters from '../components/filters'

const StreamContainer = styled.section`
  display: grid;
  grid-template-columns: 1 / -1;
  justify-items: center;
  width: 100vw;
  margin-bottom: 3rem;
`

export default () => {
  const {
    events,
    issues,
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess,
    users,
    types,
    repoPath
  } = useGitHubEvents()

  return (
    <React.Fragment>
      <GlobalStyle />
      <StreamContainer>
        <div>
          <Title>{repoPath}</Title>
        </div>
        <ViewContainer>
          {loadingEvents && <Link>Loading your events.....</Link>}
          {loadedEvents && loadedEventsSuccess && (
            <Filters users={users} types={types} issues={issues} />
          )}
          {loadedEvents && loadedEventsSuccess && <EventList events={events} />}
        </ViewContainer>
      </StreamContainer>
    </React.Fragment>
  )
}
