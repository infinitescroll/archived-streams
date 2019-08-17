import React from 'react'
import PropTypes from 'prop-types'
import { GroupButton } from './GroupButton'

export const GroupSelection = () => {
  return (
    <div>
      <GroupButton onClick={() => console.log('yo')}>Group by user</GroupButton>
      <GroupButton onClick={() => console.log('ahl')}>
        Group by issue
      </GroupButton>
    </div>
  )
}
// return <Group title={event.user} events={events} />

export const GroupList = ({ group }) => {}

GroupList.propTypes = {
  group: PropTypes.string.isRequired
}
