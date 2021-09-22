import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#006064",
      dark: "#00363a",
      light: "rgba(0, 96, 100, 0.2)"
    },
    secondary: {
      main: "#006064",
      extraLight: "#e8f5e9",
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})