import React from 'react'
// import PropTypes from 'prop-types'
import { GroupButton } from './GroupButton'
import { useGroup } from '../../hooks'

export const GroupSelection = () => {
  const { groupEvents, ungroupEvents } = useGroup()

  return (
    <div>
      <GroupButton onClick={() => groupEvents('user')}>
        Group by user
      </GroupButton>
      <GroupButton onClick={() => groupEvents('issue')}>
        Group by issue
      </GroupButton>
      <GroupButton onClick={() => ungroupEvents()}>ungroup</GroupButton>
    </div>
  )
}
// return <Group title={event.user} events={events} />

export const GroupList = () => {
  const { group } = useGroup()
  console.log(group)
  return <div>yo</div>
}
