import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useReactRouter from 'use-react-router'
import { applyFilters } from '../store/actions'
import { filterMap } from '../utils'

export default () => {
  const filters = useSelector(({ events }) => events.filters)
  const { history, location } = useReactRouter()
  const { pathname, search } = location

  const dispatch = useDispatch()

  const filterEventsByApp = useCallback(
    app => {
      const params = new URLSearchParams(search)
      params.append('filter', app)
      history.replace(`${pathname}?${params}`)

      const filter = filterMap.get(app)
      dispatch(applyFilters(new Map([[app, filter]])))
    },
    [dispatch, history, pathname, search]
  )

  useEffect(() => {
    const params = new URLSearchParams(search)
    const filterListFromUrlBar = params.getAll('filter')
    const filtersFromUrlBar = filterListFromUrlBar.reduce((accum, filter) => {
      if (filterMap.has(filter) && !filters.has(filter))
        accum.set(filter, filterMap.get(filter))
      return accum
    }, new Map())
    if (filtersFromUrlBar.size > 0) dispatch(applyFilters(filtersFromUrlBar))
  }, [dispatch, filters, search])

  return {
    filters,
    filterEventsByApp
  }
}
