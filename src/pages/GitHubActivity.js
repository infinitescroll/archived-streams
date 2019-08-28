import React, { Fragment } from 'react'
import styled from 'styled-components'
import { useGitHubEvents } from '../hooks'

import {
  Title,
  GlobalStyle,
  Link,
  ViewContainer,
  ErrorMessage
} from '../styled/components'
import { Events } from '../components/events'
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
    error,
    events,
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess,
    types,
    repoPath,
    summaries
  } = useGitHubEvents()

  return (
    <Fragment>
      <GlobalStyle />
      <StreamContainer>
        {error ? (
          <ErrorMessage>
            Oh no something went wrong! Make sure you copy pasted the github url
            properly
          </ErrorMessage>
        ) : (
          <Fragment>
            <div>
              <Title>{repoPath}</Title>
            </div>
            {loadingEvents && <Link>Loading your events.....</Link>}
            {loadedEvents && loadedEventsSuccess && (
              <ViewContainer>
                <FiltersContainer>
                  <Filters types={types} />
                </FiltersContainer>
              </ViewContainer>
            )}
            {loadedEvents && loadedEventsSuccess && (
              <Events events={events} summaries={summaries} />
            )}
          </Fragment>
        )}
      </StreamContainer>
    </Fragment>
  )
}

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  min-width: 320px;
  max-width: calc(900px);

  margin: 0.5rem;
  background: ${BR_PINK};
  border: solid 2px ${DARK_LILAC};
  border-radius: 4px;
`
