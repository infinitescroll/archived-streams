import React from 'react'
import PropTypes from 'prop-types'
import { GroupButton } from './GroupButton'
import mockStreamsServer from '../../mockStreamsServer'
import Group from './Group'

export const GroupSelection = ({ groupEvents, ungroupEvents }) => {
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

GroupSelection.propTypes = {
  groupEvents: PropTypes.func.isRequired,
  ungroupEvents: PropTypes.func.isRequired
}
// return <Group title={event.user} events={events} />

export const IssueGroups = ({ issues }) => {
  return (
    <div>
      {issues.map(issue => (
        <Group
          key={issue.id}
          title={issue.title}
          endpoint={issue.eventsUrl}
          group="issue"
        />
      ))}
    </div>
  )
}

IssueGroups.propTypes = {
  issues: PropTypes.array.isRequired
}

export const UserGroups = ({ users }) => {
  return (
    <div>
      {users.map(user => (
        <Group
          key={user.id}
          title={user.user}
          endpoint={user.eventsUrl}
          group="user"
        />
      ))}
    </div>
  )
}

UserGroups.propTypes = {
  users: PropTypes.array.isRequired
}

export const GroupList = ({ group }) => {
  if (group === 'issue')
    return <IssueGroups issues={mockStreamsServer.getIssues()} />
  if (group === 'user')
    return <UserGroups users={mockStreamsServer.getUsers()} />
}

GroupList.propTypes = {
  group: PropTypes.string.isRequired
}
