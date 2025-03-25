import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'First name is Required!'],
    },
    email: {
      type: String,
      required: [true, 'Email is Required!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required!'],
      minlength: [6, 'Password length should be greater than 6 characters'],
      select: true,
    },
    phone: {
      type: Number,
      required: [true, 'Phone is Required!'],
    },
    gender: {type: String,},
    address: {type: String,},
    role:{type: String, default: 'user'},
    cart: {type: mongoose.Schema.Types.ObjectId, ref: 'Carts'},
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Orders'}],
  },
  {
    timestamps: true,
  }
);

/* userSchema.post('', function (doc, next) {
  console.log('New user created and saved', doc);
  delete doc.password, doc.__v, doc.updatedAt, doc.createdAt;
  next();
}) */
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password, doc.__v, doc.updatedAt, doc.createdAt,doc.updatedAt;
    return ret;
  },
});

const Users = mongoose.model('Users', userSchema);
export default Users;
