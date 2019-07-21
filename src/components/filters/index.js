import React from 'react'
import { useDispatch } from 'react-redux'
import { applyFilter } from '../../store/actions'
import { GITHUB_FILTER } from '../../utils'

export default () => {
  const dispatch = useDispatch()
  return (
    <div>
      <p>Filter Stuff</p>
      <button onClick={() => dispatch(applyFilter(GITHUB_FILTER))}>
        By github
      </button>
    </div>
  )
}
