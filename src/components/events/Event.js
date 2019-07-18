import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from '../../styled/components'
import { GITHUB, TRELLO } from '../../constants'

const calculateUser = (app, data) => {
  if (app === GITHUB) return data.actor.display_login
  if (app === TRELLO) return data.memberCreator.fullName
}

const Event = ({ event: { app, data } }) => {
  return (
    <Detail>
      <div>
        {app} - type: {data.type}
      </div>
      <Link>User: {calculateUser(app, data)}</Link>
      <br />
      <br />
    </Detail>
  )
}

Event.propTypes = {
  event: PropTypes.object.isRequired
}

const Detail = styled.div`
  width: 500px;
`

export default Event
