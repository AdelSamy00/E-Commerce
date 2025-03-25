import mongoose from 'mongoose';

const resetCodeSchema = new mongoose.Schema(
  {
    email:{type: String, required: [true, 'Email is Required!']},
    code:{type: String, required: [true, 'Code is Required!']},
    token: String,
    createdAt: Date,
    expiresAt: Date,
  },
);

const ResetCodes = mongoose.model('ResetCodes', resetCodeSchema);
export default ResetCodes;
