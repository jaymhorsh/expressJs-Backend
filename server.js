import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './database/connection.js';
import productRoutes from './routes/productRoutes.js';
dotenv.config();
const app = express();
app.use(cors());
// connectDB();

// Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.
// Middleware functions can perform the following tasks:
// Execute any code.
// Make changes to the request and the response objects.
// End the request-response cycle.   
// Call the next middleware function in the stack.

//simple middleware function that logs request details
// const middleware = (req, res, next) => {
//   console.log(`${req.method} request for '${req.url}'`);
//   next();
// };
// app.use(middleware);

// request payload middleware
app.use(express.json());
// To handle URL-encoded data payloads
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/products', productRoutes);
// substack middleware
app.get('/', (req, res) => {
  res.send('Hello Welcome to Node API Server World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

// Error-handling middleware function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    status: 'error',
    message: 'Something went wrong!',
  });
});
