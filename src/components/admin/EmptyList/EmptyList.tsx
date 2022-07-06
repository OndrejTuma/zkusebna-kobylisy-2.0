import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import React from 'react'
import { CreateButton } from 'react-admin'

const EmptyList = () => {
  return (
    <Grid item width="100%" textAlign="center" pt={4}>
      <Typography variant="h4" paragraph>
        Zatím tu nic není
      </Typography>
      <Typography paragraph>
        Můžete to změnit jediným kliknutím tlačítka
      </Typography>
      <CreateButton label={'Vytvořit'}/>
    </Grid>
  )
}

export default EmptyList