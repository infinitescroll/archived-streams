import React from 'react'
import styled from 'styled-components'

import { AlignItemsRow, CenterXY, AlignItemsColumn } from '../styled/components'
import { EventList } from '../components/events'
import Filters from '../components/filters'
import { AppButtonList } from '../components/appButtons'
import { useAppData, useStream, useUser } from '../hooks'
import { GITHUB, SLACK } from '../constants'
import { RepoSelector, SlackChannelSelector } from '../components/selectors'

const StreamContainer = styled.section`
  display: grid;
  grid-column-templates: 1 / -1;
  background: {BACKGROUND_LIGHT};
`

const Separator = styled.div`
  margin: 5%;
`

const Home = () => {
  const { loadingUser, loadedUser } = useUser()

  const {
    events,
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess
  } = useStream()

  useAppData(GITHUB)
  useAppData(SLACK)
  return (
    <StreamContainer>
      <AlignItemsColumn>
        <CenterXY>
          <AppButtonList />
          <AlignItemsRow>
            <RepoSelector />
            <Separator />
            <SlackChannelSelector />
          </AlignItemsRow>
        </CenterXY>
        {loadingUser && <p> Loading user... </p>}
        {loadedUser && loadingEvents && <p> Loading your events..... </p>}
        {loadedUser && loadedEvents && loadedEventsSuccess && (
          <EventList events={events} />
        )}
        {loadedUser && loadedEvents && loadedEventsSuccess && <Filters />}
      </AlignItemsColumn>
    </StreamContainer>
  )
}

export default Home
