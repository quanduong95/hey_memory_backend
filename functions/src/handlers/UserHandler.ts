import { onDocumentWritten } from 'firebase-functions/v2/firestore'

const { getFirestore } = require('firebase-admin/firestore')

const db = getFirestore()
export const updateUserHandler = onDocumentWritten('users/{userId}', async (event: any) => {
  // grab the tweets
  const snapshot = await db.collection('unrealized').get()
  const unrealizedTweets: any = []
  snapshot.forEach((doc: any) => {
    unrealizedTweets.push({
      date: doc._fieldsProto.date,
      userId: doc._fieldsProto.userId
    })
  })
  //delete the tweets
  snapshot.forEach(async (doc: any) => {
    await db.collection('unrealized').doc(doc.id).delete()
  })
})

//  const citiesRef = db.collection('messages');
// const snapshot = await citiesRef.get();
// const array: any = [];
// snapshot.forEach((doc: any) => {
//   array.push(doc._fieldsProto.name);
// });
