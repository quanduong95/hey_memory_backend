import { Response, Request } from 'express';
const { onRequest } = require('firebase-functions/v2/https');
const { getFirestore } = require('firebase-admin/firestore');
import { onDocumentWritten } from 'firebase-functions/v2/firestore';

const db = getFirestore();

export const getMessages = onRequest(async (req: Request, res: Response) => {
  try {
    const citiesRef = db.collection('messages');
    const snapshot = await citiesRef.get();
    const array: any = [];
    snapshot.forEach((doc: any) => {
      array.push(doc._fieldsProto.name);
    });
    res.status(200).send(array);
  } catch (error) {
    res.status(500).send('Internal error');
  }
});

export const updateMessage = onRequest(async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    await db
      .collection('users')
      .doc(id)
      .set(
        {
          tweets: {
            '08122023_tweet2': {
              content: 'content2',
            },
          },
        },
        {
          merge: true,
        }
      );
    res.status(200).send('Update message successfully');
  } catch (error) {
    res.status(500).send('Error updating message');
    console.log(error);
  }
});
export const addMessage = onRequest(async (req: Request, res: Response) => {
  try {
    const customDocId = 'userId1';

    await db
      .collection('users')
      .doc(customDocId)
      .set({
        tweets: {
          '08122023_tweet1': {
            content: 'content1',
          },
        },
      });

    res.status(200).send('Added data successfully');
  } catch (error) {
    res.status(500).send('Internal error');
    console.log(error);
  }
});

export const updateMessageHandler = onDocumentWritten(
  'users/{userId}',
  async (event: any) => {
    console.log('onDocumentWritten called');
  }
);
