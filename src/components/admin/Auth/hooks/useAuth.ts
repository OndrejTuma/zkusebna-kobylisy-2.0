import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

import firebaseConfig from '../consts/firebaseConfig'

initializeApp(firebaseConfig)

const auth = getAuth()

const useAuth = () => {
  const [isBusy, setIsBusy] = useState(true)
  const [user, setUser] = useState(auth.currentUser)

  const logIn = async (email: string, password: string) => {
    setIsBusy(true)
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      setUser(user)
    } catch (err) {
      console.error(err)
    } finally {
      setIsBusy(false)
    }
  }
  const logOut = () => signOut(auth)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user)
      setIsBusy(false)
    })
  }, [])

  return {
    isBusy,
    isLogged: !!user,
    user,
    logIn,
    logOut,
  }
}

export default useAuth