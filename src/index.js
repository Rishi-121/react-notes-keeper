import React from "react";
import ReactDOM from "react-dom";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import App from "./App";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
