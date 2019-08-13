import { useEffect, useCallback } from 'react'
import isequal from 'lodash.isequal'
import { useSelector, useDispatch } from 'react-redux'
import useReactRouter from 'use-react-router'
import { applyFilterSet } from '../store/actions'
import { getListOfFiltersFromUrlBar } from '../utils'

export default () => {
  const filters = useSelector(({ events }) => events.filters)
  const { history, location } = useReactRouter()
  const { pathname, search } = location

  const dispatch = useDispatch()

  const dispatchNewFilterSet = useCallback(
    params => {
      const {
        appFilters,
        userFilters,
        typeFilters
      } = getListOfFiltersFromUrlBar(params)

      const filterSet = {
        applications: appFilters,
        users: userFilters,
        types: typeFilters
      }
      dispatch(applyFilterSet(filterSet))
    },
    [dispatch]
  )

  const filterEvents = useCallback(
    (param, value) => {
      const params = new URLSearchParams(search)
      params.append(param, value)
      history.replace(`${pathname}?${params}`)
      dispatchNewFilterSet(params)
    },
    [dispatchNewFilterSet, history, pathname, search]
  )

  const unfilterEvents = useCallback(
    (param, value) => {
      const params = new URLSearchParams(search)
      const prevFilters = params.getAll(param)
      params.delete(param)
      prevFilters.forEach(filter => {
        if (filter !== value) params.append(param, filter)
      })

      history.replace(`${pathname}?${params}`)
      dispatchNewFilterSet(params)
    },
    [dispatchNewFilterSet, history, pathname, search]
  )

  useEffect(() => {
    const params = new URLSearchParams(search)
    const { appFilters, userFilters, typeFilters } = getListOfFiltersFromUrlBar(
      params
    )

    const filterSet = {
      applications: appFilters,
      users: userFilters,
      types: typeFilters
    }

    if (!isequal(filterSet, filters)) dispatch(applyFilterSet(filterSet))
  }, [dispatch, filters, search])

  return {
    filters,
    filterEvents,
    unfilterEvents
  }
}
