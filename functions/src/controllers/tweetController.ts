import { Tweet } from '@luudvan94/hey-memory-shared-models'
import { Request, Response } from 'express'

import { addTweetToUser, addUnrealizedTweet } from '../firestore'

const { onRequest } = require('firebase-functions/v2/https')

//only in development
type TweetContent = Omit<Tweet, 'id'>
export const addTweet = onRequest(async (req: Request, res: Response) => {
  try {
    const { userId, content, createdAt } = req.body
    const tweetContent: TweetContent = {
      content,
      createdAt: new Date(createdAt)
    }

    const tweetID = await addTweetToUser(userId, tweetContent)
    const tweet: Tweet = {
      id: tweetID,
      ...tweetContent
    }
    await addUnrealizedTweet(userId, tweet)

    res.status(200).send('Update user successfully')
  } catch (error) {
    res.status(500).send('Error updating user')
  }
})
