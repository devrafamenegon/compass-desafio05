
import { Router } from 'express'
import UserController from '../api/controllers/UserController'
import loginValidation from '../api/validations/user/login'

const prefix = '/user'
const router = Router()

router.post(prefix, UserController.create)
router.post(`${prefix}/login`, loginValidation, UserController.login)

export default router
