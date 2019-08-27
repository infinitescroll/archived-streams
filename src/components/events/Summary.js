import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'

import { PUSH_EVENT, ISSUE_COMMENT_EVENT, ISSUES_EVENT } from '../../constants'

const Summary = ({ summary }) => {
  console.log(summary)
  const events = summary.issues[0].events
  const [commitCount, setCommitCount] = useState(0)
  const [commentCount, setCommentCount] = useState(0)

  useMemo(() => {
    let commitCount = 0
    let commentCount = 0
    events.forEach(event => {
      if (event.type === PUSH_EVENT)
        commitCount += event.data.payload.commits.length
      if (event.type === ISSUE_COMMENT_EVENT) commentCount += 1
      if (event.type === ISSUES_EVENT) console.log('issue event', event.data)
    })
    setCommitCount(commitCount)
    setCommentCount(commentCount)
  }, [events])

  return (
    <div>
      <p>{commitCount} commits</p>
      <p>{commentCount} comments</p>
    </div>
  )
}

Summary.propTypes = {
  summary: PropTypes.object.isRequired
}

export default Summary
