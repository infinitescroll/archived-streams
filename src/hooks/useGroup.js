import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useReactRouter from 'use-react-router'
import { applyGroup } from '../store/actions'
import { getGroupFromUrlBar } from '../utils'

export default () => {
  const groupFromRedux = useSelector(({ events }) => events.groupby)
  const { location } = useReactRouter()
  const { search } = location

  const dispatch = useDispatch()

  useEffect(() => {
    const params = new URLSearchParams(search)
    const groupFromUrlBar = getGroupFromUrlBar(params)
    if (groupFromRedux !== groupFromUrlBar)
      dispatch(applyGroup(groupFromUrlBar))
  }, [dispatch, groupFromRedux, search])

  return {
    groupbyIsActive: !!groupFromRedux,
    group: groupFromRedux
  }
}
