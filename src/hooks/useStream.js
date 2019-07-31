import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError
} from '../store/actions'
import mockStreamServer from '../mockStreamsServer'
import { filterEvents } from '../utils'
import { useFilters } from './'

export default () => {
  const dispatch = useDispatch()
  const { filters } = useFilters()
  const {
    events,
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess,
    loadedUser
  } = useSelector(({ events, user }) => ({
    loadedUser: user.loaded,
    events: events.data,
    loadingEvents: events.loading,
    loadedEvents: events.loaded,
    loadedEventsSuccess: events.loadedSuccess
  }))

  useEffect(() => {
    document.body.classList.add('background-light')
    const requestStreams = async () => {
      dispatch(requestedStreamEvents())
      await mockStreamServer.fetchEvents()
      try {
        dispatch(requestedStreamEventsSuccess(mockStreamServer.getEvents()))
      } catch (error) {
        dispatch(requestedStreamEventsError(error))
      }
    }
    if (loadedUser) {
      requestStreams()
    }
  }, [dispatch, loadedUser])

  return {
    events: events.filter(filterEvents(filters)),
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess
  }
}
