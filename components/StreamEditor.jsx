import styled from 'styled-components'
import { Box, Text, Menu, MenuItem } from '.'
import Button from './Button'

const StreamEditorHeader = styled(Menu)``

const StreamEditorRow = styled(Menu)`
  display: inline-block;
  margin: 0;
  li {
    display: inline-block;
    margin: ${props => props.theme.space[1]}px
      ${props => props.theme.space[2]}px;
  }
`

export default () => (
  <Box border="1px solid" borderColor="lightGrey">
    <StreamEditorHeader p={3} bg="blue" color="nearWhite">
      <StreamEditorRow>
        <MenuItem>
          <Text display="inline">Repo</Text>
        </MenuItem>
        <MenuItem>
          <Button>selected.repo.name</Button>
        </MenuItem>
      </StreamEditorRow>
    </StreamEditorHeader>
    <StreamEditorRow p={2}>
      <MenuItem width={1}>
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
    <StreamEditorRow p={2}>
      <MenuItem width={1}>
        <Text display="inline">Of</Text>
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
    <StreamEditorRow p={2}>
      <MenuItem width={1}>
        <Text display="inline">By</Text>
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
    <StreamEditorRow p={2}>
      <MenuItem width={1}>
        <Text display="inline">On Branch</Text>
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
  </Box>
)
