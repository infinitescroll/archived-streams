import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useReactRouter from 'use-react-router'
import { applyGroup, removeGroup } from '../store/actions'
import { getGroupFromUrlBar } from '../utils'

export default () => {
  const groupFromRedux = useSelector(({ events }) => events.groupby)
  const { history, location } = useReactRouter()
  const { pathname, search } = location

  const dispatch = useDispatch()

  const groupEvents = useCallback(
    groupType => {
      const params = new URLSearchParams(search)
      if (getGroupFromUrlBar(params) !== groupType) {
        params.set('groupby', groupType)
        history.replace(`${pathname}?${params}`)
        dispatch(applyGroup(groupType))
      }
    },
    [dispatch, history, pathname, search]
  )

  const ungroupEvents = useCallback(() => {
    const params = new URLSearchParams(search)
    params.delete('groupby')

    history.replace(`${pathname}?${params}`)
    dispatch(removeGroup())
  }, [dispatch, history, pathname, search])

  useEffect(() => {
    const params = new URLSearchParams(search)
    const groupFromUrlBar = getGroupFromUrlBar(params)
    if (groupFromRedux !== groupFromUrlBar)
      dispatch(applyGroup(groupFromUrlBar))
  }, [dispatch, groupFromRedux, search])

  return {
    groupbyIsActive: !!groupFromRedux,
    group: groupFromRedux,
    groupEvents,
    ungroupEvents
  }
}
