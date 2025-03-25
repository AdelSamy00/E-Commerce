import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'First name is Required!'],
    },
    name_ar: {
      type: String,
      required: [true, 'First name_ar is Required!'],
    },
    image: {
      type: String,
      required: [true, 'Image is Required!'],
    },
    slug:{type: String, required: [true, 'Slug is Required!']},
    slug_ar:{type: String, required: [true, 'Slug_ar is Required!']},
  },
);

const Brands = mongoose.model('Brands', brandSchema);
export default Brands;
