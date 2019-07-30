import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { OWL_LOGO } from '../assets'
import { Title, Header, AlignItemsRow } from '../styled/components'
import { EventList } from '../components/events'
import Filters from '../components/filters'
import useStream from '../hooks/useStream'
import { getFromStorage } from '../utils'
import { STREAMS_JWT } from '../constants'
import mockApiUserRequest from '../mockApi'
import {
  requestedUser,
  requestedUserError,
  requestedUserSuccess
} from '../store/actions'

const StreamContainer = styled(AlignItemsRow)`
  width: 100vw;
`

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const userRequest = async () => {
      dispatch(requestedUser)
      const {
        data: { user }
      } = await mockApiUserRequest()
      if (user) {
        // server returned user
        console.log('user: ', user)
        dispatch(requestedUserSuccess(user))
      } else {
        // server returned error
        console.log('user fetch error')
        dispatch(requestedUserError())
      }
      // render user's homepage
    }

    const tokenPresentInStorage = getFromStorage(STREAMS_JWT)
    if (tokenPresentInStorage) {
      userRequest()
    } else {
      // send to page to auth different apps
    }
  }, [dispatch])

  const {
    events,
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess
  } = useStream()

  return (
    <Header>
      <StreamContainer>
        <div
          style={{
            marginLeft: '56px',
            marginRight: '28px'
          }}
        >
          <Title> Welcome to Streams! </Title>{' '}
          <img
            src={OWL_LOGO}
            style={{
              height: '200px',
              width: 'auto'
            }}
            alt="logo"
          />
        </div>{' '}
        {loadingEvents && <p> Loading your events..... </p>}{' '}
        {loadedEvents && loadedEventsSuccess && <EventList events={events} />}{' '}
        {loadedEvents && loadedEventsSuccess && <Filters />}{' '}
      </StreamContainer>{' '}
    </Header>
  )
}

export default Home
