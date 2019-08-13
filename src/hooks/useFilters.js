import { useEffect, useCallback } from 'react'
import isequal from 'lodash.isequal'
import { useSelector, useDispatch } from 'react-redux'
import useReactRouter from 'use-react-router'
import { applyFilterSet } from '../store/actions'
import {
  getListOfFiltersFromUrlBar,
  addSearchParam,
  removeSearchParam
} from '../utils'

export default () => {
  const filters = useSelector(({ events }) => events.filters)
  const { history, location } = useReactRouter()
  const { pathname, search } = location

  const dispatch = useDispatch()

  // const filterEventsByApp = useCallback(
  //   app => {
  //     const params = new URLSearchParams(search)
  //     const appFilters = getListOfFiltersFromUrlBar(params)
  //     const newSearchParams = addSearchParam(appFilters, app, 'applications')
  //     history.replace(`${pathname}?${newSearchParams}`)

  //     dispatch(applyApplicationFilters(app))
  //   },
  //   [dispatch, history, pathname, search]
  // )

  // const unfilterEventsByApp = useCallback(
  //   app => {
  //     const params = new URLSearchParams(search)
  //     const appFilters = getListOfFiltersFromUrlBar(params)
  //     const newSearchParams = removeSearchParam(appFilters, app, 'applications')
  //     history.replace(`${pathname}?${newSearchParams}`)

  //     dispatch(removeApplicationFilters([app]))
  //   },
  //   [dispatch, history, pathname, search]
  // )

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
    filters
    // filterEventsByApp,
    // unfilterEventsByApp
  }
}
