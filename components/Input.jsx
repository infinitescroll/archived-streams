import styled from 'styled-components'
import { Input, Box } from '.'
import Button from './Button'

export default ({ disabled, id, label, placeholder, required }) => (
  <Box
    display="flex"
    justifyContent="space-between"
    border="1px solid #999"
    borderRadius="4px"
    pr={3}
  >
    {props => (props.required === true ? 'Required' : '')}
    <Input
      flexGrow="1"
      height="48px"
      pl={3}
      fontSize={2}
      border="0px"
      borderRadius="4px"
      aria-label={label}
      aria-required={required}
      disabled={disabled}
      id={id}
      placeholder={placeholder}
    />
    <Button primary m={1}>
      {props => props.text}
    </Button>
  </Box>
)
