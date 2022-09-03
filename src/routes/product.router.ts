import validateQuery from '../api/validations/product/queries'
import { Router } from 'express'
import ProductController from '../api/controllers/ProductController'
import createValidation from '../api/validations/product/create'
import updateValidation from '../api/validations/product/update'
import multer from 'multer'

const router = Router()

router.post('/product', createValidation, ProductController.create)
router.post('/product/csv', multer().single('file', 'csv'), ProductController.createWithCsv)
router.get('/product', validateQuery, ProductController.findAll)
router.get('/product/low_stock', ProductController.findLowStock)
router.get('/product/:id', ProductController.findOne)
router.get('/product/marketplace/:id', ProductController.findOneWithMapper)
router.put('/product/:id', updateValidation, ProductController.update)
router.patch('/product/:id', updateValidation, ProductController.update)
router.delete('/product/:id', ProductController.delete)

export default router
