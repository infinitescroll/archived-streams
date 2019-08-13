export const getEventMessage = data => {
  if (data.type === 'PushEvent') {
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
  } else if (data.type === 'PullRequestEvent') {
    return `Pull request ${data.payload.action}: <a href="${data.payload.pull_request.html_url}">${data.payload.pull_request.title}</a>`
  } else if (data.type === 'PullRequestReviewCommentEvent') {
    return `<a href=${data.payload.comment.html_url}>Comment</a> on pull request: ${data.payload.pull_request.title}`
  } else if (data.type === 'IssuesEvent') {
    return `Issue ${data.payload.action}: <a href=${data.payload.issue.html_url}>${data.payload.issue.title}</a>`
  } else if (data.type === 'IssueCommentEvent') {
    return `<a href=${data.payload.comment.html_url}>Comment</a> on issue: ${data.payload.issue.title}`
  } else if (data.type === 'CreateEvent') {
    if (data.payload.ref_type === 'branch') {
      return `Branch created: ${data.payload.ref}`
    } else if (data.payload.ref_type === 'repository') {
      return `Repo created! 🌱`
    } else if (data.payload.ref_type === 'tag') {
      return `Tag created: ${data.payload.ref}`
    }
  } else if (data.type === 'DeleteEvent') {
    if (data.payload.ref_type === 'branch') {
      return `Branch deleted: ${data.payload.ref}`
    }
  } else if (data.type === 'WatchEvent') {
    return `Repo watched`
  } else if (data.type === 'ForkEvent') {
    return `Repo <a href=${data.payload.forkee.html_url}>forked</a>`
  } else if (data.type === 'MemberEvent') {
    return `Member ${data.payload.action}: <a href=${data.payload.member.html_url}>${data.payload.member.login}</a>`
  } else if (data.type === 'ReleaseEvent') {
    return `Release ${data.payload.action}: <a href=${data.payload.release.html_url}>${data.payload.release.name}</a>`
  }
  return 'Unsupported event. ✨ Come around next week for updates.'
}
