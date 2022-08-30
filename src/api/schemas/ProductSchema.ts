import mongoose, { PaginateModel, Schema } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { IProduct } from '../interfaces/IProduct'
import { randomUUID } from 'crypto'

const schema = new Schema<IProduct>({
  _id: { type: String, default: randomUUID },
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  qtd_stock: { type: Number, required: true },
  stock_control_enabled: { type: Boolean, required: true, default: true },
  bar_codes: { type: String, required: true, unique: true }
},
{
  timestamps: true
})

schema.plugin(paginate)

const Product = mongoose.model<IProduct, PaginateModel<IProduct>>('Product', schema)

export default Product