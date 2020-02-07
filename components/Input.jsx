import styled from 'styled-components'
import { Input, Box } from '.'
import Button from './Button'

export default () => (
  <Box
    display="flex"
    justifyContent="space-between"
    border="1px solid #999"
    borderRadius="4px"
    pr={3}
  >
    <Input
      flexGrow="1"
      height="48px"
      pl={3}
      fontSize={2}
      border="0px"
      borderRadius="4px"
      placeholder="Placeholder"
    />
    <Button primary m={1}>
      button.name
    </Button>
  </Box>
)
