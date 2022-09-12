import { Schema, model } from 'mongoose'
import { IUser } from '../interfaces/IUser'
import { randomUUID } from 'crypto'
import bcrypt from 'bcrypt'

const SALT = Number(process.env.BCRYPT_SALT)

const UserSchema = new Schema<IUser>({
  _id: { type: String, default: randomUUID },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false
  }
},
{
  toJSON: {
    transform: function (doc, ret) {
      return {
        _id: ret._id,
        email: ret.email,
        created_at: ret.created_at,
        updated_at: ret.updated_at
      }
    }
  },
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})

UserSchema.pre('save', async function save (next) {
  if (!this.isModified('password')) return next()
  try {
    const salt = await bcrypt.genSalt(SALT)
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (err) {
    return next(err)
  }
})

UserSchema.methods.validatePassword = async function validatePassword (data) {
  return await bcrypt.compare(data, this.password)
}

export default model<IUser>('User', UserSchema)
