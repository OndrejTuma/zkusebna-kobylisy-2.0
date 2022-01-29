import { initializeApp } from 'firebase/app'

import firebaseConfig from '../consts/firebaseConfig'

export default function firebaseInit() {
  // if (firebase.apps.length > 0) {
  //   return
  // }

  initializeApp(firebaseConfig)
}