import { Response, Request } from 'express';
const { onRequest } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
import {
  onDocumentCreated,
  onDocumentWritten,
} from 'firebase-functions/v2/firestore';

initializeApp();
const db = getFirestore();

exports.getMessages = onRequest(async (req: Request, res: Response) => {
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

exports.updateMessage = onRequest(async (req: Request, res: Response) => {
  try {
    const messageRef = db.collection('messages').doc(req.query.id);
    await messageRef.set(
      {
        capital: false,
      },
      { merge: true }
    );
    res.status(200).send('Update message successfully');
  } catch (error) {
    res.status(500).send('Error updating message');
  }
});

exports.addMessage = onRequest(async (req: Request, res: Response) => {
  try {
    const data = JSON.parse(req.body);
    await db.collection('messages').add(data);
    res.status(200).send('Added data successfully');
  } catch (error) {
    res.status(500).send('Internal error');
    console.log(error);
  }
});

exports.addMessageHandler = onDocumentCreated(
  'messages/{messageId}',
  async (event: any) => {
    db.collection('add').add({
      add: 1,
    });
  }
);
exports.updateMessageHandler = onDocumentWritten(
  'messages/{messageId}',
  async (event: any) => {
    await db.collection('messages').doc('1701916204608').set({
      update: 1,
    });
  }
);
