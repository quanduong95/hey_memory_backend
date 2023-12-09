/* eslint-disable import/first */
/* eslint-disable import/order */
const admin = require('firebase-admin')
admin.initializeApp()

import { addUser, updateUser } from './controllers/UserController'
import { updateUserHandler } from './handlers/UserHandler'

export { addUser, updateUser, updateUserHandler }
