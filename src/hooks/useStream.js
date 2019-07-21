import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError
} from '../store/actions'
import mockStreamServer from '../mockStreamsServer'

export default () => {
  const dispatch = useDispatch()

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

    requestStreams()
  }, [dispatch])

  const {
    events,
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess
  } = useSelector(({ events }) => ({
    events: events.data,
    loadingEvents: events.loading,
    loadedEvents: events.loaded,
    loadedEventsSuccess: events.loadedSuccess
  }))

  return {
    events,
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess
  }
}
