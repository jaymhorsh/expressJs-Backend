import { productService } from '../services/productService.js';

export const getProducts = (req, res) => {
  // Logic to fetch products from the database
  res.status(200).json({ message: 'Fetched all products' });
};
export const createProduct = async (req, res) => {
  let response = {};
  console.log('Request Body:', req.body);
  try {
    const responseFromService = await productService(req.body);
    response.status = 200;
    response.message = 'Product created successfully';
    response.body = responseFromService;
  } catch (error) {
    response.status = 400;
    response.message = 'Error creating product';
    response.body = {};
    console.error(`Error creating product on controller: ${error.message}`);
  }
  return res.status(response.status).json(response);
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  // Logic to update the product with the given id in the database
  res.status(200).json({ message: `Product with id ${id} updated successfully` });
};
