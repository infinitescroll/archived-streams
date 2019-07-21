import React from 'react'
import { useFilters } from '../../hooks'

export default () => {
  const { filterEventsByGithub } = useFilters()
  return (
    <div>
      <p>Filter Stuff</p>
      <button onClick={filterEventsByGithub}>By github</button>
    </div>
  )
}
