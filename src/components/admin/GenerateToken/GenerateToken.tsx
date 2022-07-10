import Grid from '@mui/material/Grid'
import Button from 'Components/generic/Button'
import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../Auth'

const GenerateToken = () => {
  const [ url, setUrl ] = useState('')
  const { logOut } = useContext(AuthContext)

  const handleAuth = async () => {
    const res = await fetch('/api/auth/getAuthUrl')
    const { url } = await res.json()

    setUrl(url)
  }

  useEffect(() => {
    if (!url) {
      return
    }

    window.open(url, 'access', 'width=800,height=600')

    setUrl('')
  }, [ url ])

  return (
    <Grid container direction="column" spacing={2} textAlign="center" mt={4}>
      <Grid item>
        <Button onClick={handleAuth}>Získej Google token</Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={logOut}>Bezpečně odhlásit</Button>
      </Grid>
    </Grid>
  )
}

export default GenerateToken