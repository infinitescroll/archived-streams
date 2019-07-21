import React from 'react'
import { useFilters } from '../../hooks'
import { GITHUB } from '../../constants'

export default () => {
  const { filterEventsByApp } = useFilters()
  return (
    <div>
      <p>Filter Stuff</p>
      <button onClick={() => filterEventsByApp(GITHUB)}>By github</button>
    </div>
  )
}
