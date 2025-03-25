import Carts from "../models/Cart.js";
import Orders from "../models/Orders.js";
import Users from "../models/Users.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const cashPayment = async (req, res) => {
  try {
    const { userId,shippingAddress } = req.body;
    const {cartId} = req.params;
    console.log(userId,shippingAddress,cartId);
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cart = await Carts.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const Order = await Orders.create({user:user._id,cart:cartId,shippingAddress:shippingAddress,type:'Cash',status:'Pending',totalPrice:cart.totalPrice});
    user.orders.push(Order._id);
    await Carts.findByIdAndUpdate(cartId, { $set: { cart: [] ,totalPrice:0} }, { new: true });
    await user.save();
    res.status(200).json({ success: true, message: "Cash payment successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const onlinePayment = async (req, res) => {
  try {
    const { userId,shippingAddress } = req.body;
    const {cartId} = req.params;
    const {url} = req.query
    //console.log(userId,shippingAddress,cartId);
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cart = await Carts.findOne({_id:cartId}).populate('cart.product');
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const paymentIntent = await stripe.checkout.sessions.create({
      line_items: cart.cart.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.title,
          },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      metadata: {
        ...shippingAddress,
      },
      customer_email: user.email,
      payment_method_types: ["card"],
      success_url: `${url}/allorders`,
      cancel_url: `${url}/cart`,
      invoice_creation: {
        enabled: true
      },
      
    },).then((result) =>{
      console.log(result);
      
      res.status(200).json({ clientSecret: result ,message: "Online payment successful" });
    }).catch((error) => {
      res.status(500).json({ error: error.message })
    });
    

    /* const Order = await Orders.create({user:user._id,cart:cartId,shippingAddress:shippingAddress,type:'Online',status:'Pending',totalPrice:cart.totalPrice});
    user.orders.push(Order._id);
    await Carts.findByIdAndUpdate(cartId, { $set: { cart: [] ,totalPrice:0} }, { new: true });
    await user.save();
    res.status(200).json({ success: true, message: "Online payment successful" }); */
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}