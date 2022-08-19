import { Router } from 'express'
import ProductController from '../app/controller/ProductController'
import createValidation from '../app/validations/product/create'

const router = Router()

router.post('/api/v1/product', createValidation, ProductController.create)
router.get('/api/v1/product', ProductController.findAll)
router.get('/api/v1/product/:id', ProductController.findOne)

export default router
