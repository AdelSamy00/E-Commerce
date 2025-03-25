import Carts from "../models/Cart.js";
import Users from "../models/Users.js";
import Products from "../models/Product.js";


export const addProductToCart = async (req, res) => {
  try {
    const {userId, productId} = req.body;
    console.log(userId, productId);
    const user = await Users.findById(userId);
    let userCart= await Carts.findOne({user:user._id})
    const product = await Products.findById(productId);
    let totalPrice = 0;
    console.log(userCart);
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    if(!userCart){
      userCart = await Carts.create({user:user._id, cart:[{product:productId, quantity:1}],totalPrice:product.price});
      user.cart = userCart._id;
      userCart = await userCart.populate('cart.product');
      await user.save();
    }
    else{
      if (userCart.cart.some((cartItem) => String(cartItem.product._id) === String(productId))) {
        userCart= await Carts.findOneAndUpdate({user:user._id,'cart.product':productId},{$inc:{'cart.$.quantity':1,totalPrice:product.price}},{new:true}).populate('cart.product');
      }else{
        userCart= await Carts.findOneAndUpdate({user:user._id},{$push:{cart:{product:productId, quantity:1}},$inc:{totalPrice:product.price}},{new:true}).populate('cart.product');
        /*
        totalPrice = userCart.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
        userCart = await Carts.findOneAndUpdate({user:user._id},{$set:{totalPrice:totalPrice}}); */
      }
    }
    res.status(200).json({ success: true,message: "Product added to cart", userCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getCart = async (req, res) => {
  try {
    const {userId} = req.body;
    console.log(userId);
    const user = await Users.findById(userId);
    let userCart= await Carts.findOne({user:user._id})
    console.log(userCart);
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    if(!userCart){
      userCart = await Carts.create({user:user._id, cart:[]});
      user.cart = userCart._id;
      userCart = await userCart.populate('cart.product');
      await user.save();
    }
    res.status(200).json({ success: true,message: "Get User Cart Successfully",cart: userCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateCart = async (req, res) => {
  try {
    const {productId} = req.params;
    const {userId,quantity} = req.body;
    console.log(userId,productId,quantity);
    const user = await Users.findById(userId);
    let userCart= await Carts.findOne({user:userId})
    const product = await Products.findById(productId);
    //console.log(userCart);
    if(!product){
      return res.status(404).json({ message: "Product not found" });
    }
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    if(!userCart){
      userCart = await Carts.create({user:user._id, cart:[{product:productId, quantity:quantity}],totalPrice:product.price});
      user.cart = userCart._id;
      userCart = await userCart.populate('cart.product');
      await user.save();
    }
    else{
      userCart = await Carts.findOneAndUpdate({user:user._id,'cart.product':productId},{$inc:{'cart.$.quantity':quantity,totalPrice:product.price * quantity}},{new:true}).populate('cart.product');
      //userCart= await Carts.findOneAndUpdate({user:user._id},{$set:{cart:cart}},{new:true}).populate('cart.product');
    }
    res.status(200).json({ success: true,message: "Update User Cart Successfully",cart: userCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteProductFromCart = async (req, res) => {
  try {
    const {productId} = req.params;
    const {userId} = req.body;
    console.log(userId,productId);
    const user = await Users.findById(userId);
    let userCart= await Carts.findOne({user:userId})
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    if(!userCart){
      userCart = await Carts.create({user:user._id, cart:[],totalPrice:0});
      user.cart = userCart._id;
      userCart = await userCart.populate('cart.product');
      await user.save();
    }
    else{
      const total = userCart.cart.reduce((total, item) => {
        if(String(item.product._id) === String(productId)){
          return total + item.product.price * item.quantity;
        }
        return total;
      },0);
      console.log(total);
      userCart= await Carts.findOneAndUpdate({user:user._id,'cart.product':productId},{$pull:{cart:{product:productId}},$inc:{totalPrice:-total}},{new:true}).populate('cart.product');
    }
    res.status(200).json({ success: true,message: "Delete Product From Cart Successfully",cart: userCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const clearCart = async (req, res) => {
  try {
    const {userId} = req.body;
    console.log(userId);
    const user = await Users.findById(userId);
    let userCart= await Carts.findOne({user:userId})
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    if(!userCart){
      userCart = await Carts.create({user:user._id, cart:[],totalPrice:0});
      user.cart = userCart._id;
      await user.save();
    }
    else{
      userCart= await Carts.findOneAndUpdate({user:user._id},{$set:{cart:[],totalPrice:0}},{new:true});
    }
    res.status(200).json({ success: true,message: "Delete Cart Successfully",cart: userCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}