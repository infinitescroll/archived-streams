import React from 'react'
import PropTypes from 'prop-types'
import { GroupButton } from './GroupButton'
import mockStreamsServer from '../../mockStreamsServer'
import Group from './Group'
import PullRequestGroup from './PullRequestGroup'

export const GroupSelection = ({ groupEvents, ungroupEvents }) => {
  return (
    <div>
      <GroupButton onClick={() => groupEvents('user')}>
        Group by user
      </GroupButton>
      <GroupButton onClick={() => groupEvents('issue')}>
        Group by issue
      </GroupButton>
      <GroupButton onClick={() => groupEvents('pullrequest')}>
        Group by PR
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

export const UserGroups = ({ users, repoPath }) => {
  return (
    <div>
      {users.map(user => (
        <Group
          repoPath={repoPath}
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

export const PullRequestGroups = ({ pulls }) => {
  return (
    <div>
      {pulls.map(pull => (
        <PullRequestGroup
          key={pull.id}
          assignees={pull.assignees}
          body={pull.body}
          comments={pull.comments}
          group="pull"
          labels={pull.labels}
          number={pull.number}
          state={pull.state}
          stuff={pull}
          title={pull.title}
          url={pull.url}
          user={pull.user}
          updatedAt={pull.updatedAt}
        />
      ))}
    </div>
  )
}

PullRequestGroups.propTypes = {
  pulls: PropTypes.array.isRequired
}

export const GroupList = ({ group, repoPath }) => {
  if (group === 'issue')
    return <IssueGroups issues={mockStreamsServer.getIssues()} />
  if (group === 'user')
    return (
      <UserGroups users={mockStreamsServer.getUsers()} repoPath={repoPath} />
    )
  if (group === 'pullrequest')
    return <PullRequestGroups pulls={mockStreamsServer.getPullRequests()} />
}

GroupList.propTypes = {
  group: PropTypes.string.isRequired
}
