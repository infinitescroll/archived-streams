import styled from 'styled-components'
import { Box, Input, Button, Text, Menu, MenuItem } from '../components/Shared'
import { IcoGitHub } from '../components/icons'
import StreamEditor from '../components/StreamEditor'

const PageWrapper = styled(Box)``

export default () => (
  <>
    <PageWrapper
      display='flex'
      justifyContent='center'
      alignContent='center'
      p={3}
      height='100vh'
    >
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-around'
        height='100%'
        flexGrow='1'
        maxWidth='480px'
      >
        <Box textAlign='center'>
          <h1>Step 1</h1>
          <Text>First, give your Stream a name.</Text>
        </Box>
        <Box>
          <Input />
        </Box>
        <Box textAlign='center'>
          <Button>Cancel</Button>
        </Box>
      </Box>
    </PageWrapper>
    <PageWrapper
      display='flex'
      justifyContent='center'
      alignContent='center'
      p={3}
      height='100vh'
    >
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-around'
        height='100%'
        flexGrow='1'
        maxWidth='480px'
      >
        <Box textAlign='center'>
          <h1>Step 2</h1>
          <Text>Next, let&rsquo;s connect to GitHub</Text>
          <Text>You’ll have to authorize Streams to access your repo data</Text>
        </Box>
        <Box textAlign='center'>
          <Button display='flex' primary>
            <Box width='32px' display='inline-block'>
              <IcoGitHub maxWidth='48px' opacity='0.4' />
            </Box>
            Connect to GitHub
          </Button>
        </Box>
        <Box textAlign='center'>
          <Button>Cancel</Button>
        </Box>
      </Box>
    </PageWrapper>
    <PageWrapper
      display='flex'
      justifyContent='center'
      alignContent='center'
      p={3}
      height='100vh'
    >
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-around'
        alignContent='center'
        alignItems='center'
        minHeight='100%'
        flexGrow='1'
      >
        <Box textAlign='center'>
          <h1>Step 3</h1>
          <Text>Lastly, let&rsquo;s add a repo or two to your new stream</Text>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          textAlign='left'
          maxWidth='800px'
        >
          <Menu display='block' width='100%' flexDirection='column'>
            <MenuItem display='block'>
              <Input />
            </MenuItem>
            <Menu>
              <MenuItem display='block'>
                <Text>You own</Text>
              </MenuItem>
              <MenuItem display='inline-block' mr={3} my={2}>
                <Button>Hangtime</Button>
              </MenuItem>
              <MenuItem display='inline-block' mr={3} my={2}>
                <Button>Streams</Button>
              </MenuItem>
              <MenuItem display='inline-block' mr={3} my={2}>
                <Button>Filament</Button>
              </MenuItem>
            </Menu>
            <Menu>
              <MenuItem display='block'>
                <Text>You&rsquo;re collaborating on</Text>
              </MenuItem>
              <MenuItem display='inline-block' mr={3} my={2}>
                <Button>Hangtime</Button>
              </MenuItem>
              <MenuItem display='inline-block' mr={3} my={2}>
                <Button>Streams</Button>
              </MenuItem>
              <MenuItem display='inline-block' mr={3} my={2}>
                <Button>Filament</Button>
              </MenuItem>
            </Menu>
          </Menu>
          <StreamEditor />
        </Box>
        <Box my={3} textAlign='center'>
          <Button>Cancel</Button>
        </Box>
      </Box>
    </PageWrapper>
  </>
)
