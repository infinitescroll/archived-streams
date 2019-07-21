import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useReactRouter from 'use-react-router'
import { applyFilters } from '../store/actions'
import { filterMap } from '../utils'

export default () => {
  const filters = useSelector(({ events }) => events.filters)
  const { history, location } = useReactRouter()

  const dispatch = useDispatch()

  const filterEventsByApp = useCallback(
    app => {
      const params = new URLSearchParams(history.search)
      params.append('filter', app)
      history.replace(`${location.pathname}?${params}`)

      const filter = filterMap.get(app)
      dispatch(applyFilters(new Map([[app, filter]])))
    },
    [dispatch, history, location.pathname]
  )

  useEffect(() => {
    const params = new URLSearchParams(history.search)
    const filters = params.getAll('filters')
    const filtersFromUrlBar = filters.reduce((accum, filter) => {
      if (filterMap.has(filter)) accum.set(filter, filterMap.get(filter))
      return accum
    }, new Map())
    if (filtersFromUrlBar.length) dispatch(applyFilters(filtersFromUrlBar))
  }, [dispatch, history.search])

  return {
    filters,
    filterEventsByApp
  }
}
