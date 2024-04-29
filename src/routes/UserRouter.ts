import * as express from 'express'
import * as userController from '../controllers/UserController'
import authenticateJWT from '../utils/AuthMiddleware'


const UserRouter = express.Router()

UserRouter.post('/', userController.createUser)
UserRouter.post('/login', userController.userloginController)
UserRouter.get('/:id', authenticateJWT, userController.getUserController,)
UserRouter.delete('/:id', authenticateJWT, userController.userLogout,)



export default UserRouter
