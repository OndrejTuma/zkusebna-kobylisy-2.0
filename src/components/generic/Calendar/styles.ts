export const classes = {
  root: 'calendar',
}

const styles = () => ({
  [`&.${classes.root}`]: {
    '.rbc-header': {
      padding: '0.5rem 0',
    }
  }
})

export default styles