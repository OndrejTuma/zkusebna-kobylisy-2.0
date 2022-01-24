import React, {
  useState,
  useEffect
} from 'react'
import Link from 'next/link'

const Auth = () => {
  const [url, setUrl] = useState('')

  const handleAuth = async () => {
    const res = await fetch('/api/auth/getAuthUrl')
    const {url} = await res.json()
    setUrl(url)
  }

  useEffect(() => {
    if (!url) {
      return
    }
    const frame = window.open(url, 'access', "width=800,height=1000");

    setUrl('')
  }, [url])

  return (
    <div>
      <button onClick={handleAuth}>Get authorize url</button>
    </div>
  )
}

export default Auth