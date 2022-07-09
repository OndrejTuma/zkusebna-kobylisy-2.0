import Box from '@mui/material/Box'
import React, {
  useState,
  useEffect
} from 'react'
import Button from 'Components/generic/Button'

const Auth = () => {
  const [url, setUrl] = useState('')

  const handleAuth = async () => {
    const res = await fetch('/api/auth/getAuthUrl')
    const { url } = await res.json()

    setUrl(url)
  }

  useEffect(() => {
    if (!url) {
      return
    }

    window.open(url, 'access', "width=800,height=600");

    setUrl('')
  }, [url])

  return (
    <Box textAlign="center" mt={4}>
      <Button onClick={handleAuth}>Získej Google token</Button>
    </Box>
  )
}

export default Auth