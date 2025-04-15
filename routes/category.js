const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controller/categoryController');

// GET all categories
router.get('/', getAllCategories);

// GET category by ID
router.get('/:id', getCategoryById);

// POST create a new category
router.post('/', createCategory);

// PUT update category
router.put('/:id', updateCategory);

// DELETE a category
router.delete('/:id', deleteCategory);

module.exports = router;
