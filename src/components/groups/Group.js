import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Events } from '../events'
import { EventType } from '../events/Event'
import { DARK_PURP } from '../../styled/themes'

const Group = ({ events, open, title }) => {
  return (
    <Fragment>
      <GroupLabel>{title}</GroupLabel>
      <div style={{ display: open ? 'block' : 'none', width: '100%' }}>
        {open && <Events events={events} />}
      </div>
    </Fragment>
  )
}
Group.propTypes = {
  title: PropTypes.string.isRequired,
  events: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired
}

export const GroupLabel = styled(EventType)`
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;

  & p {
    font-size: 1rem;
    text-align: left;
    padding-left: 0.875rem;
    color: ${DARK_PURP};
    text-decoration: none;
  }
`

export default Group
