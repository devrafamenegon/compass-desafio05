
import { Router } from 'express'
import UserController from '../api/controllers/UserController'

const router = Router()

router.post('/user', UserController.create)

export default router
