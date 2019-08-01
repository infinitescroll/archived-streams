import React, { useState } from 'react'
import useReactRouter from 'use-react-router'
import { ARENA } from '../../constants'

const ArenaTokenInput = () => {
  const [code, setCode] = useState('')
  const { history } = useReactRouter()

  const handleSubmit = async event => {
    event.preventDefault()
    const arenaAuthUrl = `/authorize/app/${ARENA}?code=${code}`
    history.replace(arenaAuthUrl)
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
