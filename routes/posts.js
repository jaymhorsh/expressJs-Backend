// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const Post = require('../models/Post');
// const auth = require('../middleware/auth');

// const router = express.Router();

// // @route   GET /api/posts
// // @desc    Get all posts
// // @access  Public
// router.get('/', 
//   async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const posts = await Post.find().populate('author', 'name email').skip(skip).limit(limit).sort({ createdAt: -1 });

//     const total = await Post.countDocuments();

//     res.json({
//       success: true,
//       data: posts,
//       pagination: {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit),
//       },
//     });
//   } catch (error) {
//     console.error('Get posts error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// });

// // @route   GET /api/posts/:id
// // @desc    Get post by ID
// // @access  Public
// router.get('/:id', 
//   async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id).populate('author', 'name email');

//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: 'Post not found',
//       });
//     }

//     res.json({
//       success: true,
//       data: post,
//     });
//   } catch (error) {
//     console.error('Get post error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// });

// // @route   POST /api/posts
// // @desc    Create a new post
// // @access  Private
// router.post(
//   '/',
//   [
//     auth,
//     body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
//     body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           success: false,
//           message: 'Validation errors',
//           errors: errors.array(),
//         });
//       }

//       const { title, content } = req.body;

//       const post = new Post({
//         title,
//         content,
//         author: req.userId,
//       });

//       await post.save();
//       await post.populate('author', 'name email');

//       res.status(201).json({
//         success: true,
//         message: 'Post created successfully',
//         data: post,
//       });
//     } catch (error) {
//       console.error('Create post error:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Server error',
//       });
//     }
//   },
// );

// // @route   PUT /api/posts/:id
// // @desc    Update post
// // @access  Private
// router.put(
//   '/:id',
//   [
//     auth,
//     body('title').optional().trim().isLength({ min: 1 }).withMessage('Title cannot be empty'),
//     body('content').optional().trim().isLength({ min: 1 }).withMessage('Content cannot be empty'),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           success: false,
//           message: 'Validation errors',
//           errors: errors.array(),
//         });
//       }

//       const { title, content } = req.body;
//       const updateData = {};

//       if (title) updateData.title = title;
//       if (content) updateData.content = content;

//       const post = await Post.findOneAndUpdate({ _id: req.params.id, author: req.userId }, updateData, {
//         new: true,
//         runValidators: true,
//       }).populate('author', 'name email');

//       if (!post) {
//         return res.status(404).json({
//           success: false,
//           message: 'Post not found or not authorized to update',
//         });
//       }

//       res.json({
//         success: true,
//         message: 'Post updated successfully',
//         data: post,
//       });
//     } catch (error) {
//       console.error('Update post error:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Server error',
//       });
//     }
//   },
// );

// // @route   DELETE /api/posts/:id
// // @desc    Delete post
// // @access  Private
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const post = await Post.findOneAndDelete({
//       _id: req.params.id,
//       author: req.userId,
//     });

//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: 'Post not found or not authorized to delete',
//       });
//     }

//     res.json({
//       success: true,
//       message: 'Post deleted successfully',
//     });
//   } catch (error) {
//     console.error('Delete post error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// });

// module.exports = router;
