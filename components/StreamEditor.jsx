import styled from 'styled-components'
import { Box, Text, Menu, MenuItem } from '.'
import Button from './Button'

const StreamEditorRow = styled(Menu)`
  display: inline;
  li {
    display: inline;
    margin: ${props => props.theme.space[2]}px;
  }
`

export default () => (
  <Box p={3} border="1px solid" borderColor="lightGrey">
    <StreamEditorRow p={2}>
      <MenuItem>
        <Text display="inline">Show Me</Text>
      </MenuItem>
      <MenuItem>
        <Button>All Activity</Button>
      </MenuItem>
      <MenuItem>
        <Button>An hourly summary</Button>
      </MenuItem>
      <MenuItem>
        <Button>A daily summary</Button>
      </MenuItem>
      <MenuItem>
        <Button>A weekly summary</Button>
      </MenuItem>
    </StreamEditorRow>
    <Box p={2}>
      <Text>Of</Text>
    </Box>
    <Box p={2}>
      <Text>By</Text>
    </Box>
    <Box p={2}>
      <Text>On Branch</Text>
    </Box>
  </Box>
)
