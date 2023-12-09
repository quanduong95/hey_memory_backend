const { initializeApp } = require('firebase-admin/app');
initializeApp();
import {
  getMessages,
  updateMessage,
  addMessage,
  updateMessageHandler,
} from './controllers/mockControllers';

export { getMessages, updateMessage, addMessage, updateMessageHandler };
