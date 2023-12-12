import { ID, Tweet } from '@luudvan94/hey-memory-shared-models'
import { getFirestore } from 'firebase-admin/firestore'

type TweetContent = Omit<Tweet, 'id'>
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

  const unrealizedTweet: Tweet = {
    id: snapshot.docs[0].id,
    ...tweetContent
  }

  return unrealizedTweet
}

export const deleteUnRealizedTweet = async (tweetId: ID) => {
  await getFirestore().collection('unrealized').doc(tweetId).delete()
}

// only use in development
type TweetID = ID
export const addTweetToUser = async (userID: ID, tweet: TweetContent): Promise<TweetID> => {
  const addedTweet = await getFirestore().collection('users').doc(userID).collection('tweets').add({
    content: tweet.content,
    createdAt: tweet.createdAt
  })

  return addedTweet.id
}

type UserID = ID

export const addUnrealizedTweet = async (userId: UserID, tweet: Tweet) => {
  await getFirestore().collection('unrealized').add({
    tweetID: tweet.id,
    content: tweet.content,
    createdAt: tweet.createdAt,
    userId
  })
}
