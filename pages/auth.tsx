import React, {
  useState,
  useEffect
} from 'react'

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

    window.open(url, 'access', "width=800,height=600");

    setUrl('')
  }, [url])

  return (
    <div>
      <button onClick={handleAuth}>Get authorize url</button>
    </div>
  )
}

export default Auth