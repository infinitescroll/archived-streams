import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import withReduxStore from '../lib/with-redux-store'
import { Box } from '../components'
import StreamMenu from '../components/StreamMenu'
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


const ActivityWrapper = styled(Box)({})

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={reduxStore}>
          <Box display="block" minHeight="100vh" p={3}>
            <StreamMenu />
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
