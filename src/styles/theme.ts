import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      // main: '#6c3082',
      // main: '#6667AB',
      main: '#a0744b',
    },
    secondary: {
      light: '#fcf8e3',
      main: '#b8860b',
    },
    success: {
      main: '#67a712',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme