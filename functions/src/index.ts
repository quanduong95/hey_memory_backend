/* eslint-disable import/first */
/* eslint-disable import/order */
import { initializeApp } from 'firebase-admin/app'

initializeApp()

import { addTweet, searchTweet } from './controllers/tweetController'
import { onNewTweetAdded } from './handlers/tweetHandler'
export { addTweet, onNewTweetAdded, searchTweet }
