// I started this course 14/10/2025
import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import compression from 'compression';
// import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
// Endpoints for the contact routes
app.use('/api/contacts', contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message,
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});





// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import compression from 'compression';
// import rateLimit from 'express-rate-limit';
// import dotenv from 'dotenv';
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Security middleware
// app.use(helmet());
// app.use(
//   cors({
//     origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
//     credentials: true,
//   }),
// );

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.',
// });
// app.use('/api/', limiter);

// // Body parsing middleware
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Compression middleware
// app.use(compression());

// // Logging middleware
// app.use(morgan('combined'));

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({
//     status: 'OK',
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//   });
// });

// // API routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/posts', require('./routes/posts'));

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//   });
// });
// // this is when i ahve wha it takes to be with that in the information twchnology

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message,
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📊 Health check: http://localhost:${PORT}/health`);
//   console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
// });

// module.exports = app;

