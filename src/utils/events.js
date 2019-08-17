import React from 'react'
// import axios from 'axios'
import { EventType } from '../components/events/Event'

import {
  PUSH_EVENT,
  PULL_REQUEST_EVENT,
  PULL_REQUEST_REVIEW_COMMENT_EVENT,
  ISSUES_EVENT,
  ISSUE_COMMENT_EVENT,
  CREATE_EVENT,
  DELETE_EVENT,
  WATCH_EVENT,
  FORK_EVENT,
  MEMBER_EVENT,
  RELEASE_EVENT
} from '../constants'

export const getEventMessage = data => {
  if (data.type === PUSH_EVENT) {
    const size = data.payload.size
    if (size === 0) return 'Interesting git maneuver performed here.'
    let htmlUrl = data.payload.commits[0].url
    htmlUrl = htmlUrl.replace('api.', '')
    htmlUrl = htmlUrl.replace('/repos', '')
    htmlUrl = htmlUrl.replace('commits', 'commit')

    return `${size} commit${
      size === 1 ? '' : 's'
    } pushed: <a href="${htmlUrl}">${data.payload.commits[0].message}</a>${
      size === 1 ? '' : '...'
    }`
  } else if (data.type === PULL_REQUEST_EVENT) {
    return `Pull request ${data.payload.action}: <a href="${data.payload.pull_request.html_url}">${data.payload.pull_request.title}</a>`
  } else if (data.type === PULL_REQUEST_REVIEW_COMMENT_EVENT) {
    return `<a href=${data.payload.comment.html_url}>Comment</a> on pull request: ${data.payload.pull_request.title}`
  } else if (data.type === ISSUES_EVENT) {
    return `Issue ${data.payload.action}: <a href=${data.payload.issue.html_url}>${data.payload.issue.title}</a>`
  } else if (data.type === ISSUE_COMMENT_EVENT) {
    return `<a href=${data.payload.comment.html_url}>Comment</a> on issue: ${data.payload.issue.title}`
  } else if (data.type === CREATE_EVENT) {
    if (data.payload.ref_type === 'branch') {
      return `Branch created: ${data.payload.ref}`
    } else if (data.payload.ref_type === 'repository') {
      return `Repo created! 🌱`
    } else if (data.payload.ref_type === 'tag') {
      return `Tag created: ${data.payload.ref}`
    }
  } else if (data.type === DELETE_EVENT) {
    if (data.payload.ref_type === 'branch') {
      return `Branch deleted: ${data.payload.ref}`
    }
  } else if (data.type === WATCH_EVENT) {
    return `Repo watched`
  } else if (data.type === FORK_EVENT) {
    return `Repo <a href=${data.payload.forkee.html_url}>forked</a>`
  } else if (data.type === MEMBER_EVENT) {
    return `Member ${data.payload.action}: <a href=${data.payload.member.html_url}>${data.payload.member.login}</a>`
  } else if (data.type === RELEASE_EVENT) {
    return `Release ${data.payload.action}: <a href=${data.payload.release.html_url}>${data.payload.release.name}</a>`
  }
  return 'Unsupported event. ✨ Come around next week for updates.'
}

export const getEventData = data => {
  if (data.type === 'PushEvent') {
    if (data.payload.commits.length > 1) {
      return (
        <ul style={{ padding: 0 }}>
          {data.payload.commits.map(commit => {
            return (
              <EventType style={{ padding: '.25rem 0' }}>
                {commit.author.name}: <a href={commit.url}>{commit.message}</a>
              </EventType>
            )
          })}
        </ul>
      )
    } else {
      return ``
    }
  } else if (data.type === 'PullRequestEvent') {
    return (
      <ul style={{ padding: 0 }}>
        <EventType style={{ padding: '.25rem 0' }}>
          {data.payload.pull_request.body}
        </EventType>
        <EventType style={{ padding: '.25rem 0' }}>
          branch: {data.payload.pull_request.head.ref}
        </EventType>
        <EventType style={{ padding: '.25rem 0' }}>
          number of commits: {data.payload.pull_request.commits}
        </EventType>
        {data.payload.pull_request.requested_reviewers.map(reviewer => {
          return (
            <EventType style={{ padding: '.25rem 0' }}>
              reviewer: <a href={reviewer.html_url}>{reviewer.login}</a>
            </EventType>
          )
        })}
      </ul>
    )
    // } else if (data.type === 'ReleaseEvent') {
    //   let url = data.payload.release.url
    //   try {
    //     let releaseInfo = axios.get(url).then(() => {
    //       console.log('GOT IT: ', releaseInfo.body)
    //       return (
    //         <EventType>
    //           <a>{releaseInfo.body}</a>
    //         </EventType>
    //       )
    //     })
    //   } catch (err) {
    //     console.log(err)
    //   }
  } else if (data.type === 'IssuesEvent') {
    return (
      <React.Fragment>
        <EventType>{data.payload.issue.body}</EventType>
        <EventType style={{ marginTop: '1.25rem' }}>
          Labels:{' '}
          {data.payload.issue.labels.map(label => (
            <span
              style={{
                color: `#${label.color}`,
                // backgroundColor: DARK_BLUE,
                marginRight: '1rem'
              }}
            >
              {label.name}
            </span>
          ))}
        </EventType>
      </React.Fragment>
    )
  } else {
    return <EventType>No metadata to see here :/ maybe next time!</EventType>
  }
}
