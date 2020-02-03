import App from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import { Box, Menu, MenuItem } from '../components/index.js'
import ActivityItem from '../components/ActivityItem.js'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'system-ui', sans-serif;
    margin: 0;
  }
`

const theme = {
  fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  colors: {
    blue: '#2659FF',
    green: '#16CA64',
    red: '#FF2626',
    lightGrey: '#E0E0E0',
  },
}

const StreamMenu = styled(Menu)({
})

const StreamObject = styled(MenuItem)(
  {
    border: '1px solid #999',
    borderRadius: '100px',
  }
)

const ActivityWrapper = styled(Box)({


})

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
      <ThemeProvider theme={theme}>
        <Box
        display={'block'}
        minHeight={'100vh'}
        p={3}
        >
        <StreamMenu
        display={'inline-block'}
        py={2}
        pl={0}
        >
        <StreamObject
        display={'inline-block'}
        backgroundColor={'#f5f5f5'}
        px={3}
        py={2}
        mx={2}
        >Stream</StreamObject>
        </StreamMenu>

        <ActivityWrapper>
        <ActivityItem>

        </ActivityItem>
        </ActivityWrapper>

        </Box>
      </ThemeProvider>
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
