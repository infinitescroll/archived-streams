import React, { useState } from 'react'
import styled from 'styled-components'
import { useGitHubEvents } from '../hooks'

import { Title, GlobalStyle, ViewContainer, Link } from '../styled/components'
import { EventList } from '../components/events'
import Filters, { GroupButton } from '../components/filters'
import { BR_PINK, DARK_LILAC } from '../styled/themes'

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
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess,
    types,
    repoPath
  } = useGitHubEvents()

  const [groupType, setGroupType] = useState('')

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
            <FiltersContainer>
              <GroupButton onclick={setGroupType('user')}>
                Group by user
              </GroupButton>
              <Filters types={types} />
            </FiltersContainer>
          )}
          {loadedEvents && loadedEventsSuccess && (
            <EventList events={events} grouping={groupType} />
          )}
        </ViewContainer>
      </StreamContainer>
    </React.Fragment>
  )
}

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  margin-left: 0.875rem;
  margin-right: 0.875rem;

  background: ${BR_PINK};
  border: solid 2px ${DARK_LILAC};
  border-radius: 4px;
`
