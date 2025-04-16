const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Validate project input
const validateProjectInput = [
  body('name').isString().notEmpty().withMessage('Name is required and should be a string'),
  body('description').optional().isString().withMessage('Description should be a string'),
]

// Create a new project
router.post('/', validateProjectInput, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
      },
    });
    return res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong while creating the project' });
  }
});

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        members: true,  // Include related members
        tasks: true,    // Include related tasks
      },
    })
    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong while fetching projects' });
  }
})

// Get a project by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: {
        members: true,  // Include related members
        tasks: true,    // Include related tasks
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong while fetching the project' });
  }
});

// Update a project by ID
router.put('/:id', validateProjectInput, async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
      },
    });

    return res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong while updating the project' });
  }
});

// Delete a project by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({message:"Project Deleted"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong while deleting the project' });
  }
})

module.exports = router;
