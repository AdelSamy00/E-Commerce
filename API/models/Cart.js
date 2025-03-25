import mongoose, { Schema } from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {type: Schema.Types.ObjectId, ref: 'Users', required: [true, 'User is Required!']},
  cart: [{
    product:{type: Schema.Types.ObjectId, ref: 'Products'},
    quantity:{type: Number, default: 1},
  }],
  totalPrice:{type: Number, default: 0,min : 0},
});

cartSchema.pre(/^findOne/, function(next) {
  this.populate({
    path: 'cart.product',
  });
  next();
});


const Carts = mongoose.model('Carts', cartSchema);
export default Carts;