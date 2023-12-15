/* eslint-disable no-console */
import { Request, Response } from 'express'

import { TweetContent, TweetWithUserID, addTweetToUser, addUnrealizedTweet } from '../firestore'

const { onRequest } = require('firebase-functions/v2/https')

//only in development
export const addTweet = onRequest(async (req: Request, res: Response) => {
  try {
    const { userId, content, createdAt } = req.body
    const tweetContent: TweetContent = {
      content,
      createdAt: new Date(createdAt)
    }

    const tweetID = await addTweetToUser(userId, tweetContent)
    const tweet: TweetWithUserID = {
      id: tweetID,
      userId,
      ...tweetContent
    }
    await addUnrealizedTweet(tweet)

    res.status(200).send('Update user successfully')
  } catch (error) {
    res.status(500).send('Error updating user')
  }
})

export const searchTweet = onRequest(async (req: Request, res: Response) => {
  // try {
  //   await analyzeTweet('abc')
  //   res.status(200).send('Update user successfully')
  // } catch (error) {
  //   console.log(error)
  //   res.status(500).send('Error updating user')
  // }
})
