import { validateLogin, validateSignup } from "../Joi/Schema.js";
import Carts from "../models/Cart.js";
import ResetCodes from "../models/ResetCode.js";
import Users from "../models/Users.js";
import { CreateJWT, HashString, CompareString, GenerateRandomCode } from "../utils/index.js";
import { sendEmail } from "../utils/sendEmail.js";

export const register = async (req, res) => {
  const { name, email, password, rePassword, phone, gender, address } =
    req.body;
  try {
    console.log(name, email, password, rePassword, phone, gender, address);
    /* Add validation */
    const { error, value } = validateSignup(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    } else {
      const hashedPassword = await HashString(password);
      const userCart = await Carts.create({user:user._id, cart:[],totalPrice:0});
      const user = (
        await Users.create({ ...req.body, password: hashedPassword, cart:userCart._id })
      ).populate("cart").toJSON(); // Create a new user and return it as JSON
      //console.log(user);
      const token = CreateJWT(user);
      res.cookie("token", token, {
        httpOnly: true,
        //secure: true,
        //maxAge: 86400,
        signed: true,
      });
      return res.status(201).json({ success: true, user, token });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ error: error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email, password);
    const { error, value } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    } else {
      const user = await Users.findOne({ email })
        .select("-createdAt -updatedAt -__v")
        .populate("cart")
        .exec();
      if (!user) {
        return res.status(404).json({ message: "Invalid credentials" });
      }
      const isMatch = await CompareString(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = CreateJWT(user);
      res.cookie("token", token, {
        httpOnly: true,
        //secure: true,
        //maxAge: 86400,
        signed: true,
      });
      user.password = undefined;
      return res.status(200).json({ success: true, user, token });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getUser = async (req, res) => {
  try {
    const {userId} = req.body;
    const user = await Users.findById(userId).select("-password -createdAt -updatedAt -__v").populate("cart").exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetCode = GenerateRandomCode();
    console.log(resetCode);
    console.log(user.email);
    await sendEmail(user, resetCode,res);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const verifyResetCode = async (req, res) => {
  const { resetCode } = req.body;
  try {
    const reset = await ResetCodes.findOne({ code: resetCode }).exec();
    if (!reset) {
      return res.status(404).json({ message: "Invalid reset code" });
    }else if (reset.expiresAt < Date.now()) {
      await ResetCodes.deleteOne({ code: resetCode });
      return res.status(400).json({ success: false, message: "Reset code has expired" });
    }else{
      return res.status(200).json({ success: true, message: "Reset code is valid" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const resetPassword = async (req,res)=>{
  const {email,newPassword} =  req.body;
  try {
    const user = await Users.findOne({email})
    if(!user){
    res.status(404).json({success:false ,message: "User Is Not Found!"});
    }
    const hashedPassword = await HashString(newPassword);
    const updatedUser = await Users.findOneAndUpdate({_id:user._id},{password:hashedPassword},{new:true});
    //console.log(updatedUser.toJSON());
    const token = CreateJWT(updatedUser.toJSON());
      res.cookie("token", token, {
        httpOnly: true,
        //secure: true,
        //maxAge: 86400,
        signed: true,
      });
    res.status(200).json({success:true,message:'Reset password Successfully.',user:updatedUser.toJSON(),token});
  } catch (error) {
    res.status(500).json({message: error.message});
  }

}


