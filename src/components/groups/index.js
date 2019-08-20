import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { GroupButton } from './GroupButton'
import mockStreamsServer from '../../mockStreamsServer'
import Group from './Group'
import PullRequestGroup from './PullRequestGroup'
import BranchGroup from './BranchGroup'
import { ViewContainer } from '../../styled/components'

export const GroupSelection = ({ groupEvents, ungroupEvents }) => {
  const currentGroup = useSelector(({ events }) => events.groupby)
  return (
    <div style={{ padding: '.875rem', flex: '1', textAlign: 'center' }}>
      <GroupButton
        type="user"
        groupEvents={groupEvents}
        ungroupEvents={ungroupEvents}
      >
        Group by user {currentGroup === 'user' ? ' ✓' : ''}
      </GroupButton>
      <GroupButton
        type="issue"
        groupEvents={groupEvents}
        ungroupEvents={ungroupEvents}
      >
        Group by issue {currentGroup === 'issue' ? ' ✓' : ''}
      </GroupButton>
      <GroupButton
        type="branch"
        groupEvents={groupEvents}
        ungroupEvents={ungroupEvents}
      >
        Group by branch {currentGroup === 'branch' ? ' ✓' : ''}
      </GroupButton>
      <GroupButton
        type="pullrequest"
        groupEvents={groupEvents}
        ungroupEvents={ungroupEvents}
      ></GroupButton>
    </div>
  )
}
GroupSelection.propTypes = {
  groupEvents: PropTypes.func.isRequired,
  ungroupEvents: PropTypes.func.isRequired
}

export const IssueGroups = ({ issues }) => {
  return (
    <ViewContainer>
      {issues.map(issue => (
        <Group
          key={issue.id}
          title={issue.title}
          endpoint={issue.eventsUrl}
          group="issue"
        />
      ))}
    </ViewContainer>
  )
}

IssueGroups.propTypes = {
  issues: PropTypes.array.isRequired
}

export const UserGroups = ({ users, repoPath }) => {
  return (
    <ViewContainer>
      {users.map(user => (
        <Group
          repoPath={repoPath}
          key={user.id}
          title={user.user}
          endpoint={user.eventsUrl}
          group="user"
        />
      ))}
    </ViewContainer>
  )
}

UserGroups.propTypes = {
  repoPath: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
}

export const PullRequestGroups = ({ pulls }) => {
  return (
    <ViewContainer>
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
    </ViewContainer>
  )
}

PullRequestGroups.propTypes = {
  pulls: PropTypes.array.isRequired
}

const BranchGroups = ({ branches }) => {
  return (
    <ViewContainer>
      {Object.keys(branches).map(branchName => {
        return (
          <BranchGroup
            key={branchName}
            title={branchName}
            group="branch"
            events={branches[branchName].events}
          />
        )
      })}
    </ViewContainer>
  )
}

BranchGroups.propTypes = {
  branches: PropTypes.object.isRequired
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
  if (group === 'branch')
    return <BranchGroups branches={mockStreamsServer.getBranchGroups()} />
}

GroupList.propTypes = {
  group: PropTypes.string.isRequired
}
