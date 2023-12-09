import { Response, Request } from 'express';
const { onRequest } = require('firebase-functions/v2/https');
const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

export const updateUser = onRequest(async (req: Request, res: Response) => {
  try {
    const payload = {
      tweetId: '08122023_tweet2',
      content: 'content2',
      userId: 'userId1',
      date: '08122023',
    };
    await db
      .collection('users')
      .doc(payload.userId)
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

    await db.collection('unrealized').doc(payload.tweetId).set({
      userId: payload.userId,
      date: payload.date,
    });
    res.status(200).send('Update user successfully');
  } catch (error) {
    res.status(500).send('Error updating user');
    console.log(error);
  }
});
export const addUser = onRequest(async (req: Request, res: Response) => {
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

    res.status(200).send('Added user successfully');
  } catch (error) {
    res.status(500).send('Internal error');
    console.log(error);
  }
});
