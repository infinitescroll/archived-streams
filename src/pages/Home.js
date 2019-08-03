import React from 'react'
import styled from 'styled-components'

import { OWL_LOGO } from '../assets'
import {
  Title,
  Header,
  AlignItemsRow,
  CenterXY,
  AlignItemsColumn
} from '../styled/components'
import { EventList } from '../components/events'
import Filters from '../components/filters'
import { AppButtonList } from '../components/appButtons'
import { useAppData, useStream, useUser } from '../hooks'
import { GITHUB, SLACK } from '../constants'
import { RepoSelector, SlackChannelSelector } from '../components/selectors'

const StreamContainer = styled(AlignItemsRow)`
  width: 100vw;
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
    <Header>
      <StreamContainer>
        <div
          style={{
            marginLeft: '56px',
            marginRight: '28px',
            maxWidth: '35vw'
          }}
        >
          <Title> Welcome to Streams! </Title>
          <img
            src={OWL_LOGO}
            style={{
              height: '200px',
              width: 'auto'
            }}
            alt="logo"
          />
        </div>
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
    </Header>
  )
}

export default Home
