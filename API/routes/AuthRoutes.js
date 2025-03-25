import express from 'express';
import { forgotPassword, getUser, login, register, resetPassword, verifyResetCode } from '../controllers/AuthControllers.js';
import { authMiddleware } from '../middlewares/AuthMiddleware.js';

const router = express.Router();
router.get('/',authMiddleware, getUser);
router.post('/register', register);
router.post('/login', login);

// Forgot Password
router.post('/forgotpassword', forgotPassword);
router.post('/verifyresetcode', verifyResetCode);
router.put('/resetpassword',resetPassword)
export default router;