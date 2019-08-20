import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { GroupButton } from './GroupButton'
import mockStreamsServer from '../../mockStreamsServer'
import Group from './Group'
import PullRequestGroup from './PullRequestGroup'
import BranchGroup from './BranchGroup'

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
      <GroupButton onClick={() => groupEvents('branch')}>
        Group by branch
      </GroupButton>
      <GroupButton onClick={() => ungroupEvents()}>ungroup</GroupButton>
    </div>
  )
}

GroupSelection.propTypes = {
  groupEvents: PropTypes.func.isRequired,
  ungroupEvents: PropTypes.func.isRequired
}

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

const BranchGroups = ({ branches }) => {
  return (
    <Fragment>
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
    </Fragment>
  )
}

BranchGroups.propTypes = {
  branches: PropTypes.object.isRequired
}

export const GroupList = ({ group }) => {
  if (group === 'issue')
    return <IssueGroups issues={mockStreamsServer.getIssues()} />
  if (group === 'user')
    return <UserGroups users={mockStreamsServer.getUsers()} />
  if (group === 'pullrequest')
    return <PullRequestGroups pulls={mockStreamsServer.getPullRequests()} />
  if (group === 'branch')
    return <BranchGroups branches={mockStreamsServer.getBranchGroups()} />
}

GroupList.propTypes = {
  group: PropTypes.string.isRequired
}
