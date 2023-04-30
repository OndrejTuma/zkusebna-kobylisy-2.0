import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 40,
    },
    body1: {
      marginBottom: 16,
      marginTop: 16,
    },
    body2: {
      fontSize: 20,
      marginBottom: 16,
      marginTop: 16,
    },
  },
  palette: {
    primary: {
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
