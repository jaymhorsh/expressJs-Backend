import Product from '../model/productModel.js';

export const productService = async (product) => {
  try {
    const newProduct = new Product(product);
    await newProduct.save();
  } catch (error) {
    console.error(`Error creating product Services: ${error.message}`);
    throw new Error(`Error creating product: ${error.message}`);
  }
};
