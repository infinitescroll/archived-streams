import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useReactRouter from 'use-react-router'
import { applyFilters } from '../store/actions'
import {
  filterMap,
  GITHUB_FILTER,
  TRELLO_FILTER,
  DROPBOX_FILTER,
  SLACK_FILTER,
  ARENA_FILTER
} from '../utils'

export default () => {
  const filters = useSelector(({ events }) => events.filters)

  const dispatch = useDispatch()

  const filterEventsByGithub = useCallback(
    () => dispatch(applyFilters([GITHUB_FILTER])),
    [dispatch]
  )
  const filterEventsByTrello = useCallback(
    () => dispatch(applyFilters([TRELLO_FILTER])),
    [dispatch]
  )
  const filterEventsByDropbox = useCallback(
    () => dispatch(applyFilters([DROPBOX_FILTER])),
    [dispatch]
  )
  const filterEventsBySlack = useCallback(
    () => dispatch(applyFilters([SLACK_FILTER])),
    [dispatch]
  )
  const filterEventsByArena = useCallback(
    () => dispatch(applyFilters([ARENA_FILTER])),
    [dispatch]
  )

  const {
    location: { search }
  } = useReactRouter()

  useEffect(() => {
    const params = new URLSearchParams(search)
    const filters = params.getAll('filters')
    const filtersFromUrlBar = filters.reduce((accum, filter) => {
      if (filterMap.has(filter)) accum.set(filter, filterMap.get(filter))
      return accum
    }, new Map())
    dispatch(applyFilters(filtersFromUrlBar))
  }, [dispatch, search])

  return {
    filters,
    filterEventsByGithub,
    filterEventsByTrello,
    filterEventsByDropbox,
    filterEventsBySlack,
    filterEventsByArena
  }
}
