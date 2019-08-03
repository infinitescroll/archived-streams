import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { AlignItemsRow } from '../../styled/components'
import { setInStorage, getFromStorage } from '../../utils'
import { STREAM_SETTINGS } from '../../constants'

const ColoredCircle = styled.div`
  width: 10px;
  height: 10px;
  background: ${props => (props.active ? 'green' : 'red')};
  border-radius: 50%;
`

const Selection = ({ name, type, endpoint }) => {
  const streamSettings = getFromStorage(STREAM_SETTINGS)
    ? JSON.parse(getFromStorage(STREAM_SETTINGS))
    : { repos: [], channels: [] }

  const [selectionActive, setSelectionActive] = useState(
    !!streamSettings[type].find(setting => setting.endpoint === endpoint)
  )

  return (
    <AlignItemsRow>
      <ColoredCircle active={selectionActive} />
      <button
        onClick={() => {
          if (!selectionActive) {
            streamSettings.repos.push({ name, endpoint })
            setInStorage(STREAM_SETTINGS, JSON.stringify(streamSettings))
            setSelectionActive(true)
          }
        }}
      >
        {name}
      </button>
    </AlignItemsRow>
  )
}

Selection.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired
}

export default Selection
