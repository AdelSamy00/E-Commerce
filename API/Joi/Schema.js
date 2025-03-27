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

const productSchema = Joi.object({
  title: Joi.string().required(),
  title_ar: Joi.string().required(),
  slug: Joi.string().required(),
  slug_ar: Joi.string().required(),
  description: Joi.string().required(),
  description_ar: Joi.string().required(),
  quantity: Joi.number().required().min(1),
  price: Joi.number().required().min(1),
  category: Joi.string().required(),
  brand: Joi.string().required(),
});

export const validateSignup = validator(signupSchema);
export const validateLogin = validator(loginSchema);
export const validateProduct = validator(productSchema);