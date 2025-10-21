import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    inStock: Boolean,
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
