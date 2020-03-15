import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { API_ENDPOINT, MAGIC_LINK_ENDPOINT } from '../../constants'
import { Box, Button, Input, Text } from '../../components/Shared'

function SignUp() {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const [submitError, setSubmitError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    const postEmailUrl = `${API_ENDPOINT}/${MAGIC_LINK_ENDPOINT}`
    try {
      await axios.post(postEmailUrl, {
        email
      })
      router.push('/start/2')
      setSubmitError(false)
    } catch (_) {
      setSubmitError(true)
    }
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      p={3}
      height='100vh'
    >
      {submitting ? (
        <Box textAlign='center'>
          <Text>Loading..</Text>
        </Box>
      ) : (
        <>
          <Box textAlign='center'>
            <h1>Step 1</h1>
            <Text>First, create or login via email</Text>
          </Box>
          <form onSubmit={handleSubmit}>
            <Input
              width='480px'
              type='email'
              placeholder='Your email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {submitError && <Text>Oops something went wrong</Text>}
            <Button type='submit'>Next</Button>
          </form>
        </>
      )}
    </Box>
  )
}

export default SignUp
