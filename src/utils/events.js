export const getEventMessage = data => {
  if (data.type === 'PushEvent') {
    const size = data.payload.size
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
    let htmlUrl = data.payload.pull_request.url
    htmlUrl = htmlUrl.replace('api.', '')
    htmlUrl = htmlUrl.replace('/repos', '')

    if (data.payload.action === 'opened') {
      return `Pull request opened: <a href="${htmlUrl}">${data.payload.pull_request.title}</a>`
    }
  }
  return 'Unsupported event. 😅 Come around next week for updates.'
}
