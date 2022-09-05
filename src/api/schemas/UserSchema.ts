import mongoose, { Schema } from 'mongoose'
import { IUser } from '../interfaces/IUser'
import { randomUUID } from 'crypto'
import bcrypt from 'bcrypt'

const schema = new Schema<IUser>({
  _id: { type: String, default: randomUUID },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
},
{
  timestamps: true
})

schema.pre('save', function(next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(process.env.BCRYPT_SALT, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

schema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

const Product = mongoose.model<IUser>('User', schema)

export default Product