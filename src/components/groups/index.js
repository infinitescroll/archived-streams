import React from 'react'
import PropTypes from 'prop-types'
import { GroupButton } from './GroupButton'
import mockStreamsServer from '../../mockStreamsServer'
import PullRequestGroup from './PullRequestGroup'
import UserBranchAndIssueGroup from './UserBranchAndIssueGroup'
import { ViewContainer } from '../../styled/components'

export const GroupSelection = ({ groupEvents, ungroupEvents }) => (
  <div style={{ padding: '.875rem', flex: '1', textAlign: 'center' }}>
    <GroupButton
      type="user"
      groupEvents={groupEvents}
      ungroupEvents={ungroupEvents}
    />
    <GroupButton
      type="issue"
      groupEvents={groupEvents}
      ungroupEvents={ungroupEvents}
    />
    <GroupButton
      type="branch"
      groupEvents={groupEvents}
      ungroupEvents={ungroupEvents}
    />
    <GroupButton
      type="pullrequest"
      groupEvents={groupEvents}
      ungroupEvents={ungroupEvents}
    />
  </div>
)

GroupSelection.propTypes = {
  groupEvents: PropTypes.func.isRequired,
  ungroupEvents: PropTypes.func.isRequired
}

export const IssueGroups = ({ issues }) => {
  return (
    <ViewContainer>
      {Object.keys(issues).map(issueId => (
        <UserBranchAndIssueGroup
          key={issueId}
          group="issue"
          events={issues[issueId].events}
          title={issues[issueId].title}
        />
      ))}
    </ViewContainer>
  )
}

IssueGroups.propTypes = {
  issues: PropTypes.object.isRequired
}

export const UserGroups = ({ users }) => {
  return (
    <ViewContainer>
      {Object.keys(users).map(userId => (
        <UserBranchAndIssueGroup
          key={userId}
          group="issue"
          events={users[userId].events}
          title={users[userId].title}
        />
      ))}
    </ViewContainer>
  )
}

UserGroups.propTypes = {
  users: PropTypes.object.isRequired
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
          <UserBranchAndIssueGroup
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
