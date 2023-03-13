import Grid from '@mui/material/Grid'
import Button from 'Components/generic/Button'
import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../Auth'
import { useGetAuthUrl } from 'Hooks/queries'
import ErrorAxios from 'Components/generic/ErrorAxios'

const GenerateToken = () => {
  const [ startFetching, setStartFetching ] = useState(false)
  const { isLoading, error, isError, data } = useGetAuthUrl(startFetching)
  const { logOut } = useContext(AuthContext)

  const handleGetLoginUrl = () => setStartFetching(true)

  useEffect(() => {
    const url = data?.data?.url

    if (!url) {
      return
    }

    setStartFetching(false)
    
    window.location.href = url
  }, [ data ])

  return (
    <Grid container direction="column" spacing={2} textAlign="center" mt={4}>
      {isError && (
        <Grid item>
          <ErrorAxios error={error} />
        </Grid>
      )}
      <Grid item>
        <Button disabled={isLoading} onClick={handleGetLoginUrl}>Získej Google token</Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={logOut}>Bezpečně odhlásit</Button>
      </Grid>
    </Grid>
  )
}

export default GenerateToken
