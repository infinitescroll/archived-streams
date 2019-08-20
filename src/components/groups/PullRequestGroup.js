import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BR_PINK, BLUE, BLUE_TRANSP } from '../../styled/themes'

const PullRequestGroup = ({
  title,
  number,
  labels,
  state,
  updatedAt,
  url,
  user,
  body,
  assignees
}) => {
  return (
    <GroupContainer href={url} target="_blank" rel="noopener noreferrer">
      <h2>
        #{number} {title}
      </h2>
      <p>updated at: {updatedAt}</p>
      <p>User: {user}</p>
    </GroupContainer>
  )
}
PullRequestGroup.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  labels: PropTypes.array.isRequired,
  state: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  assignees: PropTypes.array.isRequired
}

const GroupContainer = styled.a`
  padding: 1.5rem;
  border-radius: 4px;
  border: solid 1px ${BLUE_TRANSP};
  box-shadow: -3px 3px ${BLUE};

  margin-top: 1.5rem;

  background: ${BR_PINK};
  cursor: pointer;
  display: flex;
  flex-direction: column;
`

export default PullRequestGroup
