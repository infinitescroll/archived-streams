import React from 'react'
import styled from 'styled-components'
import { useGitHubEvents, useGroup } from '../hooks'

import { Title, GlobalStyle, Link } from '../styled/components'
import { Events } from '../components/events'
import { GroupSelection, GroupList } from '../components/groups'
import Filters from '../components/filters'
import { BR_PINK, DARK_LILAC } from '../styled/themes'
import { TimeLabel } from '../components/events/EventList'

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
    // issues,
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess,
    types,
    // users,
    repoPath
  } = useGitHubEvents()

  const { groupbyIsActive, group, groupEvents, ungroupEvents } = useGroup()

  return (
    <React.Fragment>
      <GlobalStyle />
      <StreamContainer>
        <div>
          <Title>{repoPath}</Title>
        </div>
        {loadingEvents && <Link>Loading your events.....</Link>}
        {loadedEvents && loadedEventsSuccess && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <TimeLabel style={{ padding: '0' }}> </TimeLabel>
            <FiltersContainer>
              <GroupSelection
                groupEvents={groupEvents}
                ungroupEvents={ungroupEvents}
              />
              <Filters types={types} />
            </FiltersContainer>
          </div>
        )}
        {loadedEvents && loadedEventsSuccess && groupbyIsActive ? (
          <GroupList group={group} />
        ) : (
          <Events events={events} />
        )}
      </StreamContainer>
    </React.Fragment>
  )
}

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  min-width: 320px;
  max-width: calc(900px - 0.875rem);
  width: 100%;

  background: ${BR_PINK};
  border: solid 2px ${DARK_LILAC};
  border-radius: 4px;
`
