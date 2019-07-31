import React, { useState } from 'react'
import axios from 'axios'

import { SERVER_HOST, ARENA, STREAMS_JWT } from '../../constants'
import { authHeader } from '../../utils'

const ArenaTokenInput = () => {
  const [code, setCode] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    const jwt = localStorage.getItem(STREAMS_JWT)
    await axios.get(
      `${SERVER_HOST}/auth/${ARENA}?code=${code}`,
      authHeader(jwt)
    )
  }

  return (
    <form>
      <input
        type="text"
        value={code}
        onChange={e => setCode(e.target.value)}
      ></input>
      <button onClick={handleSubmit}>Submit</button>
      <label>Input Arena Token Here</label>
    </form>
  )
}

export default ArenaTokenInput
