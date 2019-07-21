import React from 'react'
import { useFilters } from '../../hooks'
import { GITHUB } from '../../constants'

export default () => {
  const { filters, filterEventsByApp, unfilterEventsByApp } = useFilters()
  const isGithubActiveFilter = filters.has(GITHUB)
  return (
    <div>
      <p>Filter Stuff</p>
      <button
        onClick={() => {
          if (isGithubActiveFilter) {
            unfilterEventsByApp(GITHUB)
          } else {
            filterEventsByApp(GITHUB)
          }
        }}
      >
        {isGithubActiveFilter ? 'Unfilter by Github' : 'Filter by github'}
      </button>
    </div>
  )
}
