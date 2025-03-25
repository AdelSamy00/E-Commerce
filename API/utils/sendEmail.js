import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import ResetCodes from '../models/ResetCode.js';
import { v4 as uuidv4 } from 'uuid';
import { HashString } from './index.js';

dotenv.config();
const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

export const sendEmail = async (user, resetCode, res) => {
  const { _id, email, name } = user;
  const token = _id + uuidv4();
  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: 'Reset Password Code',
    html: `<div
      style = 'font-family: Arial, sans-serif; font-size: 20px;background-color:white' >
        <h1>Your Reset Password Code</h1>
        <hr/>
        <h4>Hi ${name}</h4>
        <p>
          To Reset your password Copy the code below and paste it in the reset password form.
          <br>
          <p>This code <b>expires in 5 minutes</b></p>
          <br>
          <p style = 'color:#fff; padding:14px; text-decoration: none; background-color: #000'>${resetCode}</p>
        </p>
        <div style = 'margin-top: 20px;'>
          <h5>Best Regards</h5>
          <h5>Adel Samy</h5>
        </div>
      </div>`,
  };
  try {
    const hashedToken = await HashString(token);
    const reset = await ResetCodes.create({
      email:email,
      code:resetCode,
      token:hashedToken,
      createdAt:Date.now(),
      expiresAt:Date.now() + 5 * 60 * 1000,
    });
    if(reset){
      transporter.sendMail(mailOptions).then(()=>{
        console.log('Sent');
        res.status(201).send({
          success: true , message: 'Reset code sent to your email'
        });
      }).catch((error)=>{
        console.log(error.message);
        res.status(404).send({
          success: false , message: error.message
        })
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).send({
      success: false , message: error.message
    });
  }
}