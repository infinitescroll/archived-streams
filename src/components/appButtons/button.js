import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { BACKGROUND_LIGHT, OWL_TEAL, OWL_PURPLE } from '../../styled/themes'
import { APP_AUTH_ENDPOINTS, ARENA } from '../../constants'
import ArenaTokenInput from './ArenaToken'

const MyButton = styled.div`
  background-color: ${BACKGROUND_LIGHT};
  color: ${OWL_TEAL};
  font-size: 1.5rem;
  border: 0.12rem solid ${OWL_PURPLE};
  border-radius: 1rem;
  width: 100%;
  max-width: 32rem;
  padding: 0.5rem;
  margin: 1rem;
  text-align: center;
  font-family: sans-serif;
  vertical-align: middle;
  &:focus {
    outline: none;
    border: 0.12rem solid ${OWL_TEAL};
    color: ${OWL_PURPLE};
  }
  > * {
    color: ${OWL_TEAL};
  }
`

const AppButton = ({ app: { appName, userHasAuthenticated } }) => {
  return (
    <MyButton>
      {/* <a href={userHasAuthenticated ? '/' : APP_AUTH_ENDPOINTS[appName]}>
        {userHasAuthenticated
          ? `Already integrated\n${appName}!`
          : `Integrate\n${appName}!`}
      </a> */}
      <a href={APP_AUTH_ENDPOINTS[appName]}>Add {appName}</a>
      {appName === ARENA && !userHasAuthenticated && <ArenaTokenInput />}
    </MyButton>
  )
}

AppButton.propTypes = {
  app: PropTypes.object.isRequired
}

export default AppButton
