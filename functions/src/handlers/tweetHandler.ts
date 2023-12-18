/* eslint-disable no-console */
import { onDocumentCreated } from 'firebase-functions/v2/firestore'

import { analyzeTweet } from '../ai'
import { deleteUnRealizedTweet, getLatestUnRealizedTweet, updateTagsToUser } from '../firestore'

export const onNewTweetAdded = onDocumentCreated('unrealized/{tweetId}', async (event: any) => {
  try {
    const latestTweet = await getLatestUnRealizedTweet()

    const analyzedTags = await analyzeTweet(latestTweet)
    if (analyzedTags.length > 0) {
      await updateTagsToUser(latestTweet.userId, latestTweet, analyzedTags)
    }

    //delete the tweets
    await deleteUnRealizedTweet(latestTweet.id)
  } catch (error) {}
})

//  const citiesRef = db.collection('messages');
// const snapshot = await citiesRef.get();
// const array: any = [];
// snapshot.forEach((doc: any) => {
//   array.push(doc._fieldsProto.name);
// });
