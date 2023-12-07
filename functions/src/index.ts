const { logger } = require('firebase-functions');
const { onRequest } = require('firebase-functions/v2/https');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
initializeApp();
const db = getFirestore();

exports.addmessage = onRequest(async (req: any, res: any) => {
  const writeResult = await getFirestore().collection('messages').doc().get();
  res.send(writeResult);
});
exports.getAll = onRequest(async (req: any, res: any) => {
  const citiesRef = db.collection('messages');
  const snapshot = await citiesRef.get();
  const array: any = [];
  snapshot.forEach((doc: any) => {
    array.push(doc);
  });
  res.send(array);
});
