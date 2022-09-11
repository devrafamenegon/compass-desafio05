
import { Router } from 'express'
import UserController from '../api/controllers/UserController'
import loginValidation from '../api/validations/user/login'
import registerValidation from '../api/validations/user/register'

const prefix = '/user'
const router = Router()

router.post(prefix, registerValidation, UserController.register)
router.post(`${prefix}/login`, loginValidation, UserController.login)
export default router
