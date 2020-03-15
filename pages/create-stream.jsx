import React, { useState } from 'react'
import axios from 'axios'
import { Button, Box, Input, Text } from '../components/Shared'
import { API_ENDPOINT, STREAMS_JWT } from '../constants'
import useUser from '../lib/useUser'
import { authHeader, getFromStorage } from '../utils'

export default () => {
  const user = useUser()
  const [streamName, setStreamName] = useState('')
  const [creatingStream, setCreatingStream] = useState(false)
  const [creatingStreamErr, setCreatingStreamErr] = useState(null)

  const createStream = async e => {
    e.preventDefault()
    setCreatingStream(true)
    try {
      const jwt = getFromStorage(STREAMS_JWT)
      const { data } = await axios.post(
        `${API_ENDPOINT}/streams`,
        {
          name: streamName
        },
        authHeader(jwt)
      )
    } catch (err) {
      setCreatingStreamErr(err)
    }
    setCreatingStream(false)
  }
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      height='100vh'
    >
      <h1>Step 3</h1>
      <Text>Give your Stream a name.</Text>
      <form onSubmit={createStream}>
        <Input
          width='480px'
          type='text'
          placeholder='Something creative...'
          value={streamName}
          onChange={e => setStreamName(e.target.value)}
        />
        <Button type='submit'>Next</Button>
      </form>
    </Box>
  )
}
