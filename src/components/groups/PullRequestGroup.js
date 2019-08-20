import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BR_PINK, BR_LILAC, BLUE, BLUE_TRANSP } from '../../styled/themes'

const PullRequestGroup = ({
  title,
  number,
  comments,
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
      <p>Comment count: {comments}</p>
      <p>updated at: {updatedAt}</p>
      <p>User: {user}</p>
    </GroupContainer>
  )
}
PullRequestGroup.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
  labels: PropTypes.array.isRequired,
  state: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  assignees: PropTypes.array.isRequired
}
export const EventObjectContainer = styled.a`
  position: relative;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns:
    minmax(5rem, max-content) 3rem auto
    10%;
  grid-gap: 1.5rem;
  align-items: center;
  max-width: 960px;
  background: ${BR_LILAC};
  margin: 0.875rem;
  padding: 0.875rem;
  border-radius: 4px;
  border: solid 1px ${BLUE_TRANSP};
  box-shadow: -3px 3px ${BLUE};
  grid-template-areas: 'eventauthor eventauthor eventtype eventtype eventtype eventtime';
  font-size: 1rem;
  cursor: pointer;
`
const GroupContainer = styled(EventObjectContainer)`
  background: ${BR_PINK};
  cursor: pointer;
  display: flex;
  flex-direction: column;
`

export default PullRequestGroup
