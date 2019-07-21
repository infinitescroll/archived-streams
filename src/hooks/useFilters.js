import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useReactRouter from 'use-react-router'
import { applyFilters, removeFilters } from '../store/actions'
import {
  filterMap,
  getListOfFiltersFromUrlBar,
  addSearchParam,
  removeSearchParam
} from '../utils'

export default () => {
  const filters = useSelector(({ events }) => events.filters)
  const { history, location } = useReactRouter()
  const { pathname, search } = location

  const dispatch = useDispatch()

  const filterEventsByApp = useCallback(
    app => {
      const params = new URLSearchParams(search)
      const filterListFromUrlBar = getListOfFiltersFromUrlBar(params)
      const newSearchParams = addSearchParam(filterListFromUrlBar, app)
      history.replace(`${pathname}?${newSearchParams}`)

      const filter = filterMap.get(app)
      dispatch(applyFilters(new Map([[app, filter]])))
    },
    [dispatch, history, pathname, search]
  )

  const unfilterEventsByApp = useCallback(
    app => {
      const params = new URLSearchParams(search)
      const filterListFromUrlBar = getListOfFiltersFromUrlBar(params)
      const newSearchParams = removeSearchParam(filterListFromUrlBar, app)
      history.replace(`${pathname}?${newSearchParams}`)

      dispatch(removeFilters([app]))
    },
    [dispatch, history, pathname, search]
  )

  useEffect(() => {
    const params = new URLSearchParams(search)
    const filterListFromUrlBar = getListOfFiltersFromUrlBar(params)
    const filtersFromUrlBar = filterListFromUrlBar.reduce((accum, filter) => {
      if (filterMap.has(filter) && !filters.has(filter))
        accum.set(filter, filterMap.get(filter))
      return accum
    }, new Map())
    if (filtersFromUrlBar.size > 0) dispatch(applyFilters(filtersFromUrlBar))
  }, [dispatch, filters, search])

  return {
    filters,
    filterEventsByApp,
    unfilterEventsByApp
  }
}
