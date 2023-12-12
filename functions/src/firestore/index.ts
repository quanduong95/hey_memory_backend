import { ID, Tweet } from '@luudvan94/hey-memory-shared-models'
import { getFirestore } from 'firebase-admin/firestore'

export type TweetContent = Omit<Tweet, 'id'>
export type TweetWithUserID = Tweet & { userId: ID }

export const getLatestUnRealizedTweet = async () => {
  const snapshot = await getFirestore()
    .collection('unrealized')
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get()

  const tweetContent: TweetContent = {
    content: snapshot.docs[0].data().content,
    createdAt: snapshot.docs[0].data().createdAt
  }
  const userId = snapshot.docs[0].data().userId

  const unrealizedTweet: TweetWithUserID = {
    id: snapshot.docs[0].id,
    ...tweetContent,
    userId
  }

  return unrealizedTweet
}

export const deleteUnRealizedTweet = async (tweetId: ID) => {
  await getFirestore().collection('unrealized').doc(tweetId).delete()
}

// only use in development
export const addTweetToUser = async (userID: ID, tweet: TweetContent): Promise<ID> => {
  const addedTweet = await getFirestore().collection('users').doc(userID).collection('tweets').add({
    content: tweet.content,
    createdAt: tweet.createdAt
  })

  return addedTweet.id
}

export const addUnrealizedTweet = async (tweet: TweetWithUserID) => {
  await getFirestore().collection('unrealized').doc(tweet.id).set(
    {
      content: tweet.content,
      createdAt: tweet.createdAt,
      userId: tweet.userId
    },
    { merge: true }
  )
}
