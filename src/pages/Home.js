import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import axios from 'axios'
import { OWL_LOGO } from '../assets'
import {
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError
} from '../store/actions'

const fakeAjaxReq = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(fakeData)
    }, 200)
  })

const Home = ({
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError
}) => {
  const fetchEvents = async () => {
    requestedStreamEvents()
    try {
      requestedStreamEventsSuccess(await fakeAjaxReq())
    } catch (error) {
      requestedStreamEventsError(error)
    }
  }
  return (
    <div>
      <img src={OWL_LOGO} className="App-logo" alt="logo" />
      <button onClick={fetchEvents}>This is where we would fetch events</button>
    </div>
  )
}

Home.propTypes = {
  requestedStreamEvents: PropTypes.func.isRequired,
  requestedStreamEventsSuccess: PropTypes.func.isRequired,
  requestedStreamEventsError: PropTypes.func.isRequired
}

const mapStateToProps = ({ events }) => {
  return {
    events
  }
}

const mapDispatchToProps = {
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

/* until we get real data in */
export const fakeData = [
  {
    _id: '5d2df2289cc87d69228df638',
    app: 'github',
    payload: {
      action: 'created',
      issue: {
        url:
          'https://api.github.com/repos/openworklabs/streams-server/issues/1',
        repository_url:
          'https://api.github.com/repos/openworklabs/streams-server',
        labels_url:
          'https://api.github.com/repos/openworklabs/streams-server/issues/1/labels{/name}',
        comments_url:
          'https://api.github.com/repos/openworklabs/streams-server/issues/1/comments',
        events_url:
          'https://api.github.com/repos/openworklabs/streams-server/issues/1/events',
        html_url: 'https://github.com/openworklabs/streams-server/issues/1',
        id: 468534647,
        node_id: 'MDU6SXNzdWU0Njg1MzQ2NDc=',
        number: 1,
        title: 'Test',
        user: {
          login: 'listenaddress',
          id: 8434548,
          node_id: 'MDQ6VXNlcjg0MzQ1NDg=',
          avatar_url: 'https://avatars3.githubusercontent.com/u/8434548?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/listenaddress',
          html_url: 'https://github.com/listenaddress',
          followers_url: 'https://api.github.com/users/listenaddress/followers',
          following_url:
            'https://api.github.com/users/listenaddress/following{/other_user}',
          gists_url:
            'https://api.github.com/users/listenaddress/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/listenaddress/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/listenaddress/subscriptions',
          organizations_url: 'https://api.github.com/users/listenaddress/orgs',
          repos_url: 'https://api.github.com/users/listenaddress/repos',
          events_url:
            'https://api.github.com/users/listenaddress/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/listenaddress/received_events',
          type: 'User',
          site_admin: false
        },
        labels: [],
        state: 'open',
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 20,
        created_at: '2019-07-16T09:04:54Z',
        updated_at: '2019-07-16T15:49:59Z',
        closed_at: null,
        author_association: 'MEMBER',
        body: ''
      },
      comment: {
        url:
          'https://api.github.com/repos/openworklabs/streams-server/issues/comments/511875073',
        html_url:
          'https://github.com/openworklabs/streams-server/issues/1#issuecomment-511875073',
        issue_url:
          'https://api.github.com/repos/openworklabs/streams-server/issues/1',
        id: 511875073,
        node_id: 'MDEyOklzc3VlQ29tbWVudDUxMTg3NTA3Mw==',
        user: {
          login: 'listenaddress',
          id: 8434548,
          node_id: 'MDQ6VXNlcjg0MzQ1NDg=',
          avatar_url: 'https://avatars3.githubusercontent.com/u/8434548?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/listenaddress',
          html_url: 'https://github.com/listenaddress',
          followers_url: 'https://api.github.com/users/listenaddress/followers',
          following_url:
            'https://api.github.com/users/listenaddress/following{/other_user}',
          gists_url:
            'https://api.github.com/users/listenaddress/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/listenaddress/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/listenaddress/subscriptions',
          organizations_url: 'https://api.github.com/users/listenaddress/orgs',
          repos_url: 'https://api.github.com/users/listenaddress/repos',
          events_url:
            'https://api.github.com/users/listenaddress/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/listenaddress/received_events',
          type: 'User',
          site_admin: false
        },
        created_at: '2019-07-16T15:49:59Z',
        updated_at: '2019-07-16T15:49:59Z',
        author_association: 'MEMBER',
        body: 'k'
      },
      repository: {
        id: 197064220,
        node_id: 'MDEwOlJlcG9zaXRvcnkxOTcwNjQyMjA=',
        name: 'streams-server',
        full_name: 'openworklabs/streams-server',
        private: false,
        owner: {
          login: 'openworklabs',
          id: 46582040,
          node_id: 'MDEyOk9yZ2FuaXphdGlvbjQ2NTgyMDQw',
          avatar_url: 'https://avatars3.githubusercontent.com/u/46582040?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/openworklabs',
          html_url: 'https://github.com/openworklabs',
          followers_url: 'https://api.github.com/users/openworklabs/followers',
          following_url:
            'https://api.github.com/users/openworklabs/following{/other_user}',
          gists_url:
            'https://api.github.com/users/openworklabs/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/openworklabs/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/openworklabs/subscriptions',
          organizations_url: 'https://api.github.com/users/openworklabs/orgs',
          repos_url: 'https://api.github.com/users/openworklabs/repos',
          events_url:
            'https://api.github.com/users/openworklabs/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/openworklabs/received_events',
          type: 'Organization',
          site_admin: false
        },
        html_url: 'https://github.com/openworklabs/streams-server',
        description: 'A streams server to manage webhooks ',
        fork: false,
        url: 'https://api.github.com/repos/openworklabs/streams-server',
        forks_url:
          'https://api.github.com/repos/openworklabs/streams-server/forks',
        keys_url:
          'https://api.github.com/repos/openworklabs/streams-server/keys{/key_id}',
        collaborators_url:
          'https://api.github.com/repos/openworklabs/streams-server/collaborators{/collaborator}',
        teams_url:
          'https://api.github.com/repos/openworklabs/streams-server/teams',
        hooks_url:
          'https://api.github.com/repos/openworklabs/streams-server/hooks',
        issue_events_url:
          'https://api.github.com/repos/openworklabs/streams-server/issues/events{/number}',
        events_url:
          'https://api.github.com/repos/openworklabs/streams-server/events',
        assignees_url:
          'https://api.github.com/repos/openworklabs/streams-server/assignees{/user}',
        branches_url:
          'https://api.github.com/repos/openworklabs/streams-server/branches{/branch}',
        tags_url:
          'https://api.github.com/repos/openworklabs/streams-server/tags',
        blobs_url:
          'https://api.github.com/repos/openworklabs/streams-server/git/blobs{/sha}',
        git_tags_url:
          'https://api.github.com/repos/openworklabs/streams-server/git/tags{/sha}',
        git_refs_url:
          'https://api.github.com/repos/openworklabs/streams-server/git/refs{/sha}',
        trees_url:
          'https://api.github.com/repos/openworklabs/streams-server/git/trees{/sha}',
        statuses_url:
          'https://api.github.com/repos/openworklabs/streams-server/statuses/{sha}',
        languages_url:
          'https://api.github.com/repos/openworklabs/streams-server/languages',
        stargazers_url:
          'https://api.github.com/repos/openworklabs/streams-server/stargazers',
        contributors_url:
          'https://api.github.com/repos/openworklabs/streams-server/contributors',
        subscribers_url:
          'https://api.github.com/repos/openworklabs/streams-server/subscribers',
        subscription_url:
          'https://api.github.com/repos/openworklabs/streams-server/subscription',
        commits_url:
          'https://api.github.com/repos/openworklabs/streams-server/commits{/sha}',
        git_commits_url:
          'https://api.github.com/repos/openworklabs/streams-server/git/commits{/sha}',
        comments_url:
          'https://api.github.com/repos/openworklabs/streams-server/comments{/number}',
        issue_comment_url:
          'https://api.github.com/repos/openworklabs/streams-server/issues/comments{/number}',
        contents_url:
          'https://api.github.com/repos/openworklabs/streams-server/contents/{+path}',
        compare_url:
          'https://api.github.com/repos/openworklabs/streams-server/compare/{base}...{head}',
        merges_url:
          'https://api.github.com/repos/openworklabs/streams-server/merges',
        archive_url:
          'https://api.github.com/repos/openworklabs/streams-server/{archive_format}{/ref}',
        downloads_url:
          'https://api.github.com/repos/openworklabs/streams-server/downloads',
        issues_url:
          'https://api.github.com/repos/openworklabs/streams-server/issues{/number}',
        pulls_url:
          'https://api.github.com/repos/openworklabs/streams-server/pulls{/number}',
        milestones_url:
          'https://api.github.com/repos/openworklabs/streams-server/milestones{/number}',
        notifications_url:
          'https://api.github.com/repos/openworklabs/streams-server/notifications{?since,all,participating}',
        labels_url:
          'https://api.github.com/repos/openworklabs/streams-server/labels{/name}',
        releases_url:
          'https://api.github.com/repos/openworklabs/streams-server/releases{/id}',
        deployments_url:
          'https://api.github.com/repos/openworklabs/streams-server/deployments',
        created_at: '2019-07-15T20:01:47Z',
        updated_at: '2019-07-15T20:06:53Z',
        pushed_at: '2019-07-15T20:06:50Z',
        git_url: 'git://github.com/openworklabs/streams-server.git',
        ssh_url: 'git@github.com:openworklabs/streams-server.git',
        clone_url: 'https://github.com/openworklabs/streams-server.git',
        svn_url: 'https://github.com/openworklabs/streams-server',
        homepage: null,
        size: 120,
        stargazers_count: 0,
        watchers_count: 0,
        language: 'JavaScript',
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: true,
        has_pages: false,
        forks_count: 0,
        mirror_url: null,
        archived: false,
        disabled: false,
        open_issues_count: 1,
        license: {
          key: 'mit',
          name: 'MIT License',
          spdx_id: 'MIT',
          url: 'https://api.github.com/licenses/mit',
          node_id: 'MDc6TGljZW5zZTEz'
        },
        forks: 0,
        open_issues: 1,
        watchers: 0,
        default_branch: 'primary'
      },
      organization: {
        login: 'openworklabs',
        id: 46582040,
        node_id: 'MDEyOk9yZ2FuaXphdGlvbjQ2NTgyMDQw',
        url: 'https://api.github.com/orgs/openworklabs',
        repos_url: 'https://api.github.com/orgs/openworklabs/repos',
        events_url: 'https://api.github.com/orgs/openworklabs/events',
        hooks_url: 'https://api.github.com/orgs/openworklabs/hooks',
        issues_url: 'https://api.github.com/orgs/openworklabs/issues',
        members_url:
          'https://api.github.com/orgs/openworklabs/members{/member}',
        public_members_url:
          'https://api.github.com/orgs/openworklabs/public_members{/member}',
        avatar_url: 'https://avatars3.githubusercontent.com/u/46582040?v=4',
        description: ''
      },
      sender: {
        login: 'listenaddress',
        id: 8434548,
        node_id: 'MDQ6VXNlcjg0MzQ1NDg=',
        avatar_url: 'https://avatars3.githubusercontent.com/u/8434548?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/listenaddress',
        html_url: 'https://github.com/listenaddress',
        followers_url: 'https://api.github.com/users/listenaddress/followers',
        following_url:
          'https://api.github.com/users/listenaddress/following{/other_user}',
        gists_url: 'https://api.github.com/users/listenaddress/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/listenaddress/starred{/owner}{/repo}',
        subscriptions_url:
          'https://api.github.com/users/listenaddress/subscriptions',
        organizations_url: 'https://api.github.com/users/listenaddress/orgs',
        repos_url: 'https://api.github.com/users/listenaddress/repos',
        events_url:
          'https://api.github.com/users/listenaddress/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/listenaddress/received_events',
        type: 'User',
        site_admin: false
      }
    },
    __v: 0
  }
]
