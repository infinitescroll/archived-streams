import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { GITHUB } from '../../constants'
import Selection from './Selection'

export default () => {
  const { repos } = useSelector(({ user }) => ({
    repos: user.apps[GITHUB].repos || []
  }))
  return (
    <div>
      <h3>Select which GitHub repos to add to this stream</h3>
      {repos.map(repo => {
        return repo.private ? (
          <Fragment key={repo.id} />
        ) : (
          <Selection
            name={repo.name}
            type="repos"
            key={repo.id}
            endpoint={repo.events_url}
          />
        )
      })}
    </div>
  )
}
