import mongoose, { Schema } from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {type: Schema.Types.ObjectId, ref: 'Users', required: [true, 'User is Required!']},
  cart: {type: Schema.Types.ObjectId, ref: 'Carts', required: [true, 'Cart is Required!']},
  shippingAddress:{
    details:{type: String},
    phone:{type: String},
    city:{type: String},
  },
  type:{type: String, default: 'Cash' ,required: [true, 'Type is Required!']},
  status:{type: String, default: 'Pending', required: [true, 'Status is Required!']},
  totalPrice:{type: Number, default: 0,min : 0},
});

orderSchema.pre(/^findOne/, function(next) {
  this.populate({
    path: 'cart',
  });
  next();
});


const Orders = mongoose.model('Orders', orderSchema);
export default Orders;