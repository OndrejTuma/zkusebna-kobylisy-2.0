import { Theme } from '@mui/material'

export const classes = {
  root: 'calendar',
}

const styles = ({ theme }: { theme: Theme }) => ({
  [`&.${classes.root}`]: {
    '&': {
      height: 700,
    },
    '.rbc-btn-group button': {
      borderColor: theme.palette.primary.main,
      cursor: 'pointer',
    },
    '.rbc-header': {
      padding: '0.5rem 0',
    },
    '.rbc-show-more': {
      color: theme.palette.primary.main,
    },
    '.rbc-today': {
      backgroundColor: theme.palette.secondary.light,
    },
    '.rbc-off-range-bg': {
      backgroundColor: 'transparent',
    },
    '.rbc-event': {
      borderRadius: 0,
      backgroundColor: 'transparent',
      padding: 0,
      
      '&:focus': {
        outline: 'none',
      },
    },
    '.rbc-toolbar-label': {
      fontSize: 24,
      textTransform: 'capitalize',
    }
  },
})

export default styles
