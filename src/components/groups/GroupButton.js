import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { BLUE_TRANSP, BR_CREAM, MID_BLUE } from '../../styled/themes'

const GroupStyledButton = styled.button`
  margin: 0.25rem;
  border: 1px solid ${BLUE_TRANSP};
  border-radius: 4px;

  font-size: 1rem;
  font-family: 'Lucida Console', Monaco, monospace;
  cursor: pointer;

  :focus {
    outline: none;
  }

  color: ${props => (props.active ? BR_CREAM : MID_BLUE)};
  background-color: ${props => (props.active ? MID_BLUE : BR_CREAM)};
`

export const GroupButton = ({ type, groupEvents, ungroupEvents }) => {
  const currentGroup = useSelector(({ events }) => events.groupby)
  const isActive = currentGroup === type

  return (
    <GroupStyledButton
      active={isActive}
      onClick={() => (isActive ? ungroupEvents() : groupEvents(type))}
    >
      <Text isActive={isActive} type={type} />
    </GroupStyledButton>
  )
}

const Text = ({ isActive, type }) => {
  switch (type) {
    case 'pullrequest':
      return `Group by Open Pull Requests ${isActive ? ' ✓' : ''}`
    case 'user':
      return `Group by User ${isActive ? ' ✓' : ''}`
    case 'issue':
      return `Group by Issues ${isActive ? ' ✓' : ''}`
    default:
      return `uhhhh`
  }
}

Text.propTypes = {
  isActive: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
}

GroupButton.propTypes = {
  groupEvents: PropTypes.func.isRequired,
  ungroupEvents: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}
