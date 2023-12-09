import { onDocumentWritten } from 'firebase-functions/v2/firestore';
const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();
export const updateUserHandler = onDocumentWritten(
  'users/{userId}',
  async (event: any) => {
    const snapshot = await db.collection('unrealized').get();
    snapshot.forEach((doc: any) => {
      console.log(doc);
    });
  }
);

//  const citiesRef = db.collection('messages');
// const snapshot = await citiesRef.get();
// const array: any = [];
// snapshot.forEach((doc: any) => {
//   array.push(doc._fieldsProto.name);
// });
