import styled from 'styled-components'
import { Box, Text, Label, Menu, MenuItem, Icon } from '../components/index'
import Input from '../components/Input'
import Button from '../components/Button'
import StreamEditor from '../components/StreamEditor'
import Avatar from '../components/Avatar'

import { IcoClose, IcoGitHub } from '../components/Icons'

const PageWrapper = styled(Box)``

export default () => (
  <PageWrapper display="block" p={3} px={[2, 3, 5]} height="100vh">
    <Box>
      <Box maxWidth={640}>
        <h1>General</h1>
        <h4>Name</h4>
        <Input placeholder="Stream Name" required text="test" />
      </Box>
      <Box maxWidth={640} my={4}>
        <h1>People</h1>
        <Input
          placeholder="Add someone else to manage this stream?  "
          required
          text="test"
        />
        <Menu
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          border="1px solid grey"
          borderRadius={4}
          p={2}
          my={3}
        >
          <MenuItem display="flex">
            <Avatar />
          </MenuItem>
          <MenuItem>"user.name" can</MenuItem>
          <MenuItem>
            <Menu display="flex">
              <MenuItem mx={2}>
                <Button>View</Button>
              </MenuItem>
              <MenuItem mx={2}>
                <Button>Update stream</Button>
              </MenuItem>
              <MenuItem mx={2}>
                <Button>Update permissions</Button>
              </MenuItem>
            </Menu>
          </MenuItem>
          <IcoClose />
        </Menu>
      </Box>
      <Box maxWidth={960} my={4}>
        <h1>Feeds</h1>
        <Box display="flex">
          <Icon width="32px" mr={2}>
            <IcoGitHub />
          </Icon>
          <Text>GitHub</Text>
        </Box>
        <Menu
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          border="1px solid grey"
          borderRadius={4}
          p={2}
          my={3}
        >
          <MenuItem display="flex">
            <Avatar />
          </MenuItem>
          <MenuItem>"user.name" added</MenuItem>
          <MenuItem>
            <Menu display="flex" alignItems="center">
              <MenuItem mx={2}>
                <Button>repo.name</Button>
              </MenuItem>
              <MenuItem>
                <Label>Displaying</Label>
              </MenuItem>
              <MenuItem mx={2}>
                <Button>All Activity</Button>
              </MenuItem>
              <MenuItem>
                <Label>By</Label>
              </MenuItem>
              <MenuItem mx={2}>
                <Button>Everyone</Button>
              </MenuItem>
              <MenuItem>
                <Label>On Branch</Label>
              </MenuItem>
              <MenuItem mx={2}>
                <Button>All</Button>
              </MenuItem>
            </Menu>
          </MenuItem>
          <IcoClose />
        </Menu>
      </Box>
    </Box>
  </PageWrapper>
)
