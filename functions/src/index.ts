/* eslint-disable import/first */
/* eslint-disable import/order */
// import { initializeApp } from 'firebase-admin/app'
const admin = require('firebase-admin')
admin.initializeApp()
const firestore = admin.firestore()
firestore.settings({
  host: 'localhost:8080',
  ssl: false
})
// if (process.env.FUNCTIONS_EMULATOR) {

// }
// initializeApp()

import { addTweet, searchTweet } from './controllers/tweetController'
import { onNewTweetAdded } from './handlers/tweetHandler'
export { addTweet, onNewTweetAdded, searchTweet }
