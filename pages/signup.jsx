import React, { useState } from 'react'
import axios from 'axios'

import { SERVER_HOST, MAGIC_LINK_ENDPOINT } from '../constants'
import { Button, Input } from '../components/Shared'

function SignUp() {
  const [email, setEmail] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()

    const postEmailUrl = `${SERVER_HOST}/${MAGIC_LINK_ENDPOINT}`

    try {
      await axios.post(postEmailUrl, {
        email
      })
      setSubmitError(false)
      setSubmitSuccess(true)
    } catch (_) {
      setSubmitSuccess(false)
      setSubmitError(true)
    }
  }

  return (
    <form>
      <Input
        type='email'
        placeholder='Your email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Button onClick={handleSubmit}>Sign Up</Button>
      {/* {submitSuccess && (
          <SignUpAlert>
            Check your email for an absolutely tasty link and get
            STREAMIN&rsquo;
          </SignUpAlert>
        )}
        {submitError && (
          <SignUpAlert>
            Ok that didn&rsquo;t work Either your email wasn&rsquo;t an email or
            our shit is broken and you should pay more for Streams so we have
            time to fix it
          </SignUpAlert>
        )} */}
    </form>
  )
}

export default SignUp
