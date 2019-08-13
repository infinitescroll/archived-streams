import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useReactRouter from 'use-react-router'

import {
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError
} from '../store/actions'
import mockStreamServer from '../mockStreamsServer'

export default () => {
  const [fetched, setFetched] = useState(false)
  const { location } = useReactRouter()

  const params = new URLSearchParams(location.search)
  const repoPath = params.get('repo')
  const reconstructedUrl = new URL(
    `https://api.github.com/repos/${repoPath}/events`
  )
  const dispatch = useDispatch()

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

  useEffect(() => {
    document.body.classList.add('background-light')
    const requestStreams = async () => {
      dispatch(requestedStreamEvents())

      const events = await mockStreamServer.fetchGithubEvents([
        { endpoint: reconstructedUrl }
      ])

      try {
        dispatch(
          requestedStreamEventsSuccess(mockStreamServer.sortEvents(events))
        )
      } catch (error) {
        dispatch(requestedStreamEventsError(error))
      }
    }
    if (!fetched) {
      requestStreams()
      setFetched(true)
    }
  }, [dispatch, reconstructedUrl, fetched])

  return {
    events,
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess
  }
}
