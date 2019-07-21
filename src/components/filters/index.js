import React from 'react'
import { useFilters } from '../../hooks'
import { GITHUB } from '../../constants'

export default () => {
  const { filterEventsByApp, unfilterEventsByApp } = useFilters()
  return (
    <div>
      <p>Filter Stuff</p>
      <button onClick={() => filterEventsByApp(GITHUB)}>
        Filter by github
      </button>
      <button onClick={() => unfilterEventsByApp(GITHUB)}>
        Unfilter by github
      </button>
    </div>
  )
}
