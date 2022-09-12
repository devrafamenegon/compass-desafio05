import { PaginateModel, Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { IProduct } from '../interfaces/IProduct'
import { randomUUID } from 'crypto'

const schema = new Schema<IProduct>({
  _id: { type: String, default: randomUUID },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
    max: 1000
  },
  qtd_stock: {
    type: Number,
    required: true,
    min: 0,
    max: 100000
  },
  stock_control_enabled: {
    type: Boolean,
    required: true,
    default: true,
    validate: function () {
      return this.qtd_stock > 0
    }
  },
  bar_codes: {
    type: String,
    required: true,
    unique: true,
    minlength: 13,
    maxlength: 13
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})

schema.plugin(paginate)

const Product = model<IProduct, PaginateModel<IProduct>>('Product', schema)

export default Product
