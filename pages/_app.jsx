import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import withReduxStore from '../lib/with-redux-store'
import { Box, Menu, MenuItem } from '../components'
import Button from '../components/Button'
import ActivityItem from '../components/ActivityItem'
import StreamEditor from '../components/StreamEditor'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => props.theme.font};
    margin: 0;
  }
`

const theme = {
  font: 'system-ui, sans-serif',
  fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  colors: {
    text: '#0f0f0f',
    background: '#f7f7f7',
    primary: '#',
    secondary: '#',
    blue: '#2659FF',
    green: '#4FD494',
    red: '#FF2626',
    lightGrey: '#E0E0E0'
  }
}

const StreamMenu = styled(Menu)({})

const StreamObject = styled(MenuItem)({
  border: '1px solid #999',
  borderRadius: '100px'
})

const ActivityWrapper = styled(Box)({})

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={reduxStore}>
          <Box display="block" minHeight="100vh" p={3}>
            <StreamMenu display="inline-block" py={2} pl={0}>
              <StreamObject
                display="inline-block"
                backgroundColor="#f5f5f5"
                px={3}
                py={2}
                mx={2}
              >
                Stream
              </StreamObject>
            </StreamMenu>
            <Button primary>New Stream</Button>
            <ActivityWrapper>
              <StreamEditor />
              <ActivityItem />
            </ActivityWrapper>
          </Box>
        </Provider>
      </ThemeProvider>
    )
  }
}

export default withReduxStore(MyApp)
