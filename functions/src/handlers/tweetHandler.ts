import { onDocumentWritten } from 'firebase-functions/v2/firestore'

import { analyzedTweetContent } from '../ai'
import { deleteUnRealizedTweet, getLatestUnRealizedTweet, updateTagsToUser } from '../firestore'

export const onNewTweetAdded = onDocumentWritten(
  'users/{userId}/tweets/{tweetID}',
  async (event: any) => {
    try {
      // eslint-disable-next-line no-console
      console.log('new tweet added')

      const latestTweet = await getLatestUnRealizedTweet()

      // eslint-disable-next-line no-console
      console.log(latestTweet)
      const analyzedTags = await analyzedTweetContent(latestTweet)
      if (analyzedTags.length > 0) {
        await updateTagsToUser(latestTweet.userId, latestTweet, analyzedTags)
      }

      //delete the tweets
      await deleteUnRealizedTweet(latestTweet.id)
    } catch (error) {}
  }
)

//  const citiesRef = db.collection('messages');
// const snapshot = await citiesRef.get();
// const array: any = [];
// snapshot.forEach((doc: any) => {
//   array.push(doc._fieldsProto.name);
// });
