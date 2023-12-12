import { onDocumentWritten } from 'firebase-functions/v2/firestore'

import { deleteUnRealizedTweet, getLatestUnRealizedTweet } from '../firestore'

export const onNewTweetAdded = onDocumentWritten(
  'users/{userId}/tweets/{tweetID}',
  async (event: any) => {
    // eslint-disable-next-line no-console
    console.log('new tweet added')

    const latestTweet = await getLatestUnRealizedTweet()

    // eslint-disable-next-line no-console
    console.log(latestTweet)

    //delete the tweets
    await deleteUnRealizedTweet(latestTweet.id)
  }
)

//  const citiesRef = db.collection('messages');
// const snapshot = await citiesRef.get();
// const array: any = [];
// snapshot.forEach((doc: any) => {
//   array.push(doc._fieldsProto.name);
// });
