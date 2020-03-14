import styled from 'styled-components'
import {
  color,
  typography,
  border,
  layout,
  space,
  flexbox
} from 'styled-system'
import Box from './Box'
import Button from './Button'

export const Input = styled.input`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${border}
  ${typography}

  &:focus {
    outline: none;
  }
`

export default () => (
  <Box
    display='flex'
    justifyContent='space-between'
    border='1px solid #999'
    borderRadius='4px'
    pr={3}
  >
    <Input
      flexGrow='1'
      height='48px'
      pl={3}
      fontSize={2}
      border='0px'
      borderRadius='4px'
      placeholder='Placeholder'
    />
    <Button primary m={1}>
      button.name
    </Button>
  </Box>
)
