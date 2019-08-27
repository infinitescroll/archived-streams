import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useReactRouter from 'use-react-router'

import {
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError
} from '../store/actions'
import { filterEvents } from '../utils'
import { useFilters } from './'
import mockStreamServer from '../mockStreamsServer'

export default () => {
  const [fetched, setFetched] = useState(false)
  const { location } = useReactRouter()
  const { filters } = useFilters()

  const params = new URLSearchParams(location.search)
  const repoPath = params.getAll('repo')
  const reconstructedUrl = new URL(`https://api.github.com/repos/${repoPath}`)
  const dispatch = useDispatch()

  const {
    error,
    events,
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess
  } = useSelector(({ events }) => ({
    error: events.error,
    events: events.data,
    loadingEvents: events.loading,
    loadedEvents: events.loaded,
    loadedEventsSuccess: events.loadedSuccess
  }))

  useEffect(() => {
    document.body.classList.add('background-light')
    const requestStreams = async () => {
      dispatch(requestedStreamEvents())
      try {
        const events = await mockStreamServer.fetchGithubEvents({
          endpoint: reconstructedUrl
        })

        dispatch(requestedStreamEventsSuccess(events))
      } catch (error) {
        dispatch(requestedStreamEventsError(error))
      }
    }
    if (!fetched) {
      requestStreams()
      setFetched(true)
    }
  }, [dispatch, reconstructedUrl, fetched])

  const filteredEvents = {}
  Object.keys(events).forEach(timeLabel => {
    filteredEvents[timeLabel] = events[timeLabel].filter(filterEvents(filters))
  })

  const filterSummaryEvents = summary => {
    const filteredEvents = {}
    Object.keys(summary).forEach(type => {
      filteredEvents[type] = []
      summary[type].forEach(resource => {
        const events = resource.events.filter(filterEvents(filters))
        if (events.length > 0) {
          filteredEvents[type].push({
            ...summary[type][resource],
            events
          })
        }
      })
    })

    return summary
  }

  const summaries = {
    today: filterSummaryEvents(
      mockStreamServer.getResourcesTouchedDuringTimePeriod('today')
    ),
    yesterday: filterSummaryEvents(
      mockStreamServer.getResourcesTouchedDuringTimePeriod('yesterday')
    ),
    lastWeek: filterSummaryEvents(
      mockStreamServer.getResourcesTouchedDuringTimePeriod('lastWeek')
    ),
    lastMonth: filterSummaryEvents(
      mockStreamServer.getResourcesTouchedDuringTimePeriod('lastMonth')
    ),
    catchAll: filterSummaryEvents(
      mockStreamServer.getResourcesTouchedDuringTimePeriod('catchAll')
    )
  }

  return {
    error,
    events: filteredEvents,
    issues: mockStreamServer.getIssues(),
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess,
    repoPath,
    summaries,
    types: mockStreamServer.getTypes(),
    users: mockStreamServer.getUsers()
  }
}
