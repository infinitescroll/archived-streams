import React from 'react'
import PropTypes from 'prop-types'
import { useFilters } from '../../hooks'

const Filters = ({ types, users }) => {
  const { filters, filterEvents, unfilterEvents } = useFilters()

  return (
    <div>
      <p>Filter By User</p>
      {users.map(user => {
        return (
          <div key={user}>
            <button
              style={{
                color: filters.users.indexOf(user) > -1 ? 'green' : 'blue'
              }}
              onClick={() => {
                if (filters.users.indexOf(user) > -1) {
                  unfilterEvents('user', user)
                } else {
                  filterEvents('user', user)
                }
              }}
            >
              {user}
            </button>
          </div>
        )
      })}
      <p>Filter By Activity type</p>
      {types.map(type => {
        return (
          <div key={type}>
            <button
              style={{
                color: filters.types.indexOf(type) > -1 ? 'green' : 'blue'
              }}
              onClick={() => {
                if (filters.types.indexOf(type) > -1) {
                  unfilterEvents('type', type)
                } else {
                  filterEvents('type', type)
                }
              }}
            >
              {type}
            </button>
          </div>
        )
      })}
    </div>
  )
}

Filters.propTypes = {
  types: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
}

export default Filters
