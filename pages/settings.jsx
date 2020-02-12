import styled from 'styled-components'
import { Box, Text, Menu, MenuItem } from '../components/index'
import Input from '../components/Input'
import Button from '../components/Button'
import { IcoGitHub } from '../components/icons'
import StreamEditor from '../components/StreamEditor'

const PageWrapper = styled(Box)``

export default () => (
  <PageWrapper display="block" p={3} px={[2, 3, 5]} height="100vh">
    <Box maxWidth="640px">
      <Box>
        <h1>General</h1>
        <h4>Name</h4>
        <Input placeholder="Stream Name" required text="test" />
      </Box>
      <Box my={4}>
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
          p={2}
          my={3}
        >
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
        </Menu>
      </Box>
    </Box>
  </PageWrapper>
)
