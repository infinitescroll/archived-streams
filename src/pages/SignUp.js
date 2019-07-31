import React, { useState } from 'react'
import axios from 'axios'

import { SERVER_HOST, MAGIC_LINK_ENDPOINT } from '../constants'
import {
  SubmitButton,
  TextField,
  CenterXY,
  SignUpAlert
} from '../styled/components'

function SignUp() {
  const [email, setEmail] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()

    const postEmailUrl = `${SERVER_HOST}/${MAGIC_LINK_ENDPOINT}`
    axios
      .post(postEmailUrl, {
        email: email
      })
      .then(() => {
        setSubmitError(false)
        setSubmitSuccess(true)
      })
      .catch(() => {
        setSubmitSuccess(false)
        setSubmitError(true)
      })
  }

  return (
    <form>
      <CenterXY>
        <TextField
          type="email"
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>Sign Up</SubmitButton>
        {submitSuccess && (
          <SignUpAlert>
            {' '}
            Check your email for an absolutely tasty link and get STREAMIN'
          </SignUpAlert>
        )}{' '}
        {submitError && (
          <SignUpAlert>
            {' '}
            Ok that didn't work Either your email wasn't an email or our shit is
            broken and you should pay more for Streams so we have time to fix it
          </SignUpAlert>
        )}
      </CenterXY>
    </form>
  )
}

export default SignUp
