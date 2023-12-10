/* eslint-disable import/first */
/* eslint-disable import/order */
import * as fireStore from '../../hey-memory-firestore'

fireStore.initialize()

import { addUser, updateUser } from './controllers/UserController'
import { updateUserHandler } from './handlers/UserHandler'

export { addUser, updateUser, updateUserHandler }
