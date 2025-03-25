import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    sold:{type: Number, default: 0},
    images:[{type: String}],
    subcategory:[{type: Schema.Types.ObjectId, ref: 'Catigories'}],
    ratingsQuantity:{type: Number, default: 0},
    title: {type: String, required: [true, 'Title is Required!']},
    title_ar: {type: String, required: [true, 'Title_ar is Required!']},
    slug: {type: String, required: [true, 'Slug is Required!']},
    slug_ar: {type: String, required: [true, 'Slug_ar is Required!']},
    description: {type: String, required: [true, 'Description is Required!']},
    description_ar: {type: String, required: [true, 'Description_ar is Required!']},
    quantity: {type: Number, default: 1},
    price: {type: Number, required: [true, 'Price is Required!']},
    imageCover:{type: String},
    category: {type: Schema.Types.ObjectId, ref: 'Categories', required: [true, 'Category is Required!']},
    brand: {type:Schema.Types.ObjectId, ref: 'Brands', required: [true, 'Brand is Required!']},
    ratingsAverage:{type: Number, default: 0},
  },
  {
    timestamps: true,
  }
);
  
productSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'category',
  }).populate({
    path: 'brand',
  });
  next();
});

const Products = mongoose.model('Products', productSchema);
export default Products;
