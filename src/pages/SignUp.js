import React from 'react'
import { AlignItemsColumn, SubmitButton } from '../styled/components'

function SignUp() {
  return (
    <form action="/idk">
      <AlignItemsColumn>
        <input type="email" placeholder="your email" />
        <SubmitButton type="submit">Sign Up</SubmitButton>
      </AlignItemsColumn>
    </form>
  )
}

export default SignUp
