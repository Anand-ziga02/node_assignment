const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// GET /api/categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { tasks: true },
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET /api/categories/:id
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: { tasks: true },
    });

    if (!category) return res.status(404).json({ error: 'Category not found' });

    res.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /api/categories
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === '')
    return res.status(400).json({ error: 'Name is required' });

  try {
    const category = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(category);
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'Category name must be unique' });
    } else {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

// PUT /api/categories/:id
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || name.trim() === '')
    return res.status(400).json({ error: 'Name is required' });

  try {
    const existing = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existing) return res.status(404).json({ error: 'Category not found' });

    const updated = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    res.json(updated);
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'Category name must be unique' });
    } else {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

// DELETE /api/categories/:id
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existing) return res.status(404).json({ error: 'Category not found' });

    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
