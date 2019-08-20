import React from 'react'
import styled from 'styled-components'
import { useGitHubEvents, useGroup } from '../hooks'

import { Title, GlobalStyle, ViewContainer, Link } from '../styled/components'
import { Events } from '../components/events'
import { GroupSelection, GroupList } from '../components/groups'
import Filters from '../components/filters'
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
        <ViewContainer>
          {loadingEvents && <Link>Loading your events.....</Link>}
          {loadedEvents && loadedEventsSuccess && (
            <FiltersContainer>
              <GroupSelection
                groupEvents={groupEvents}
                ungroupEvents={ungroupEvents}
              />
              <Filters types={types} />
            </FiltersContainer>
          )}
          {loadedEvents && loadedEventsSuccess && groupbyIsActive ? (
            <GroupList group={group} repoPath={repoPath} />
          ) : (
            <Events events={events} />
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
