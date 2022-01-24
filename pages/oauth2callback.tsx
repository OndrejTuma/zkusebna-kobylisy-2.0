import React from 'react'

const Oauth2callback = ({ tokens }) => {
  return (
    <div>
      <p>you did it!</p>
      <pre>{JSON.stringify(tokens, null, 2)}</pre>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { code } = context.query

  const res = await fetch('http://localhost:3000/api/auth/createAuthToken', {
    method: 'POST',
    body: JSON.stringify({
      code
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const { tokens } = await res.json()

  return {
    props: {
      tokens
    },
  }
}

export default Oauth2callback