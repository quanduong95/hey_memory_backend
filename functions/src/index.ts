const { initializeApp } = require('firebase-admin/app');
initializeApp();
import { updateUserHandler } from './handlers/UserHandler';
import { updateUser, addUser } from './controllers/UserController';
export { updateUser, addUser };
export { updateUserHandler };
