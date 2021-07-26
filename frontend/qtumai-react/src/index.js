import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import mixin from "./styles/mixin";
import GlobalStyle from "./styles/GlobalStyle";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: "30px",
  transition: transitions.SCALE,
};

ReactDOM.render(
  <React.Fragment>
    <AlertProvider template={AlertTemplate} {...options}>
      <GlobalStyle />
      <ThemeProvider theme={{ ...theme, ...mixin }}>
        <Routes />
      </ThemeProvider>
    </AlertProvider>
  </React.Fragment>,
  document.getElementById("root")
);
