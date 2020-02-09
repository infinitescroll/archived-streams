import styled from 'styled-components'
import { Box, Text } from '../components/index'
import Input from '../components/Input'
import Button from '../components/Button'
import { IcoGitHub } from '../components/icons'

const PageWrapper = styled(Box)``

export default () => (
  <>
    <PageWrapper
      display="flex"
      justifyContent="center"
      alignContent="center"
      p={3}
      height="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        height="100%"
        flexGrow="1"
        maxWidth="480px"
      >
        <Box textAlign="center">
          <h1>Step 1</h1>
          <Text>First, give your Stream a name.</Text>
        </Box>
        <Box>
          <Input></Input>
        </Box>
        <Box textAlign="center">
          <Button>Cancel</Button>
        </Box>
      </Box>
    </PageWrapper>
    <PageWrapper
      display="flex"
      justifyContent="center"
      alignContent="center"
      p={3}
      height="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        height="100%"
        flexGrow="1"
        maxWidth="480px"
      >
        <Box textAlign="center">
          <h1>Step 2</h1>
          <Text>Next, let's connect to GitHub</Text>
          <Text>You’ll have to authorize Streams to access your repo data</Text>
        </Box>
        <Box textAlign="center">
          <Button primary>
            <Box width="32px" display="inline-block">
              <IcoGitHub maxWidth="48px" opacity="0.4" />
            </Box>
            Connect to GitHub
          </Button>
        </Box>
        <Box textAlign="center">
          <Button>Cancel</Button>
        </Box>
      </Box>
    </PageWrapper>
  </>
)
