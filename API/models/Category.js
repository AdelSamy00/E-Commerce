import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
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

const Categories = mongoose.model('Categories', categorySchema);
export default Categories;
