import { Response, Request } from 'express';
const { onRequest } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const express = require('express');

const app = express();
initializeApp();
const db = getFirestore();

app.get('/messages', async (req: Request, res: Response) => {
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

app.put('/message/:id', async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    const messageRef = db.collection('messages').doc(req.params.id);
    await messageRef.set(
      {
        capital: true,
      },
      { merge: true }
    );
    res.status(200).send('Update message successfully');
  } catch (error) {
    res.status(500).send('Error updating message');
  }
});

app.post('/message', async (req: Request, res: Response) => {
  try {
    const data = JSON.parse(req.body);
    await db.collection('messages').add(data);
    res.status(200).send('Added data successfully');
  } catch (error) {
    res.status(500).send('Internal error');
    console.log(error);
  }
});

exports.routes = onRequest(app);
