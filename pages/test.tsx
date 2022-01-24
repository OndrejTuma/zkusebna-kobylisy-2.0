import React, {
  useState,
  useEffect
} from 'react'
import Link from 'next/link'

const Test = () => {
  const [data, setData] = useState('')

  const handleEvent = async () => {
    const res = await fetch('/api/event')
    const data = await res.json()
    setData(data)
  }

  return (
    <div>
      <button onClick={handleEvent}>Get event</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Test