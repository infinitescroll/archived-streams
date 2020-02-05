import App from "next/app";
import React from "react";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import { Box, Menu, MenuItem } from "../components/index.js";
import { ButtonPrimary } from "../components/Button.js";
import ActivityItem from "../components/ActivityItem.js";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'system-ui', sans-serif;
  }
  body {
    margin: 0;
  }
`;

const theme = {
  fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  colors: {
    text: "#0f0f0f",
    background: "#f7f7f7",
    primary: "#",
    secondary: "#",
    blue: "#2659FF",
    green: "#4FD494",
    red: "#FF2626",
    lightGrey: "#E0E0E0"
  }
};

const StreamMenu = styled(Menu)({});

const StreamObject = styled(MenuItem)({
  border: "1px solid #999",
  borderRadius: "100px"
});

const ActivityWrapper = styled(Box)({});

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Box display={"block"} minHeight={"100vh"} p={3}>
            <StreamMenu display={"inline-block"} py={2} pl={0}>
              <StreamObject
                display={"inline-block"}
                backgroundColor={"#f5f5f5"}
                px={3}
                py={2}
                mx={2}
              >
                Stream
              </StreamObject>
            </StreamMenu>
            <ButtonPrimary>Submit</ButtonPrimary>
            <ActivityWrapper>
              <ActivityItem></ActivityItem>
            </ActivityWrapper>
          </Box>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
