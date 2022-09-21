import validateQuery from '../api/validations/product/queries'
import { Router } from 'express'
import ProductController from '../api/controllers/ProductController'
import createValidation from '../api/validations/product/create'
import updateValidation from '../api/validations/product/update'
import multer from 'multer'
import authenticateUser from '../api/middlewares/authenticateUser'

const prefix = '/product'
const router = Router()

router.post(prefix, authenticateUser, createValidation, ProductController.create)
router.post(`${prefix}/csv`, multer().single('file', 'csv'), authenticateUser, ProductController.createWithCsv)
router.get(prefix, authenticateUser, validateQuery, ProductController.findAll)
router.get(`${prefix}/low_stock`, authenticateUser, ProductController.findLowStock)
router.get(`${prefix}/:id`, authenticateUser, ProductController.findOne)
router.get(`${prefix}/marketplace/:id`, authenticateUser, ProductController.findOneWithMapper)
router.put(`${prefix}/:id`, authenticateUser, updateValidation, ProductController.update)
router.patch(`${prefix}/:id`, authenticateUser, updateValidation, ProductController.update)
router.delete(`${prefix}/:id`, authenticateUser, ProductController.delete)

export default router
