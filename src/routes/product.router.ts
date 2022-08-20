import { Router } from 'express'
import ProductController from '../app/controller/ProductController'
import createValidation from '../app/validations/product/create'
import updateValidation from '../app/validations/product/update'

const router = Router()

router.post('/api/v1/product', createValidation, ProductController.create)
router.get('/api/v1/product', ProductController.findAll)
router.get('/api/v1/product/low_stock', ProductController.findLowStock)
router.get('/api/v1/product/:id', ProductController.findOne)
router.put('/api/v1/product/:id', updateValidation, ProductController.update)
router.delete('/api/v1/product/:id', ProductController.delete)

export default router
