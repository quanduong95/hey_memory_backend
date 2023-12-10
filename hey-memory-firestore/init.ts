import { Firestore, getFirestore } from 'firebase-admin/firestore'

export let db: Firestore

export const initialize = () => {
  db = getFirestore()
}
