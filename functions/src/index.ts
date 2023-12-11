/* eslint-disable import/first */
/* eslint-disable import/order */
import { initializeApp } from 'firebase-admin/app'
import { addUser, updateUser } from './controllers/UserController'
import { updateUserHandler } from './handlers/UserHandler'

initializeApp()

export { addUser, updateUser, updateUserHandler }
