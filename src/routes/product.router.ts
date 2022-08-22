import validateQuery from '../app/validations/product/queries'
import { Router } from 'express'
import ProductController from '../app/controller/ProductController'
import createValidation from '../app/validations/product/create'
import updateValidation from '../app/validations/product/update'
import multer from 'multer'

const router = Router()

router.post('/api/v1/product', createValidation, ProductController.create)
router.post('/api/v1/product/csv', multer().single('file', 'csv'), ProductController.createWithCsv)
router.get('/api/v1/product', validateQuery, ProductController.findAll)
router.get('/api/v1/product/low_stock', ProductController.findLowStock)
router.get('/api/v1/product/:id', ProductController.findOne)
router.put('/api/v1/product/:id', updateValidation, ProductController.update)
router.patch('/api/v1/product/:id', updateValidation, ProductController.update)
router.delete('/api/v1/product/:id', ProductController.delete)

export default router
