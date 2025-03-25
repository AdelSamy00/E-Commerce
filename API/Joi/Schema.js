import Joi from 'joi';

const validator = (schema) => (playload) =>
  schema.validate(playload, { abortEarly: false });

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  rePassword: Joi.ref('password'),
  phone: Joi.number().required(),
  gender: Joi.string(),
  address: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const validateSignup = validator(signupSchema);
export const validateLogin = validator(loginSchema);