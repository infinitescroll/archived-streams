import App from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

import { Box, Menu, MenuItem } from '../components/index.js'

const StreamMenu = styled(Menu)({
})

const StreamObject = styled(MenuItem)({
})

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
      <Box></Box>
        {/*<Component {...pageProps} />*/}

        <Box
        display={'block'}
        minHeight={'100vh'}
        p={3}
        >
        <StreamMenu
        display={'inline'}
        py={2}
        >
        <StreamObject
        display={'inline-block'}
        background={'#000'}
        px={3}
        py={2}
        >Stream</StreamObject>
        </StreamMenu>
        </Box>

      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
