/* eslint-disable functional/immutable-data */
import { createTheme } from "@mui/material/styles";

import getOverrides from "./overrides";

// Create a theme instance.
const theme = createTheme({
  spacing: 4,
  breakpoints: {
    values: {
      xs: 0,
      sm: 356,
      md: 740,
      lg: 1104,
      xl: 1580,
    },
  },

  typography: {
    button: {
      textTransform: "none",
    },
    fontSize: 16,
  },
  shape: {
    borderRadius: 4,
  },
});

theme.props = {
  MuiSnackbar: {
    anchorOrigin: {
      horizontal: "center",
      vertical: "bottom",
    },
  },
  MuiCheckbox: {
    color: "primary",
  },
  MuiRadio: {
    color: "primary",
  },
  MuiLink: {
    underline: "always",
  },
  MuiPaper: {
    elevation: 0,
    square: true,
    variant: "outlined",
  },
  MuiButton: {
    color: "primary",
    disableElevation: true,
    variant: "contained",
  },
  MuiButtonBase: {
    disableRipple: true,
  },
  MuiInputLabel: {
    shrink: true,
  },
  MuiInput: {
    disableUnderline: true,
  },
};

export default theme;
