import React from 'react'
import PropTypes from 'prop-types'
import { useFilters } from '../../hooks'
import { GITHUB } from '../../constants'

const Filters = ({ types, users }) => {
  const {
    filters,
    filterEventsByApp,
    unfilterEventsByApp,
    filterEventsByUser,
    unfilterEventsByUser
  } = useFilters()

  // const isGithubActiveFilter = filters.has(GITHUB)
  return (
    <div>
      <p>Filter Stuff</p>
      <button
        onClick={() => {
          // if (isGithubActiveFilter) {
          //   unfilterEventsByApp(GITHUB)
          // } else {
          //   filterEventsByApp(GITHUB)
          // }
        }}
      >
        {/* {isGithubActiveFilter ? 'Unfilter by Github' : 'Filter by github'} */}
      </button>
    </div>
  )
}

Filters.propTypes = {
  types: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
}

export default Filters
