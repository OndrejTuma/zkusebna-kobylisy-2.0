import admin from 'firebase-admin'

import serviceAccount from '../consts/serviceAccountKey.json'

export default function firebaseAdminInit() {
  if (admin.apps.length > 0) {
    return
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}