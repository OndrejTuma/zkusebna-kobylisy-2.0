import { initializeApp, getApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const getFirebaseAuth = () => {
  let app

  try {
    app = getApp()
  } catch (error) {
    app = initializeApp()
  }
  
  const auth = getAuth(app)

  return auth
}

export default getFirebaseAuth