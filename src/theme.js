// src/theme.js
import { createTheme } from '@mui/material/styles';
// @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontWeightMedium:500
  },
  palette: {
    primary: {
      main: '#014421', // royal green
    },
  },
});

export default theme;
