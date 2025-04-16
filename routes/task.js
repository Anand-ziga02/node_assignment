const express = require('express');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const router = express.Router();

// Create Task
// POST /api/tasks
// Body: { title, description, projectId, categoryId, dueDate, priority, estimatedTime, status, attachmentPath, recurrence }
router.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            projectId,
            categoryId,
            dueDate,
            priority,
            estimatedTime,
            status = 'not_started',
            attachmentPath,
            recurrence,
            dependsOnId,
            userId
        } = req.body;

        const task = await prisma.task.create({
            data: {
                title,
                description,
                projectId,
                categoryId,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                priority,
                estimatedTime,
                status,
                attachmentPath,
                recurrence,
                dependsOnId,
                userId
            }
        });

        res.status(201).json(task);
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ message: 'Failed to create task' });
    }
});

// Get all tasks
// GET /api/tasks
// Optional query: status, priority, dueDate, categoryId

router.get('/', async (req, res) => {
    try {
        const { status, priority, dueDate, categoryId, search, sortBy = 'createdAt', order = 'desc' } = req.query;

        const tasks = await prisma.task.findMany({
            where: {
                ...(status && { status }),
                ...(priority && { priority }),
                ...(dueDate && { dueDate: new Date(dueDate) }),
                ...(categoryId && { categoryId: parseInt(categoryId) }),
                ...(search && {
                    OR: [
                        { title: { contains: search, mode: 'insensitive' } },
                        { description: { contains: search, mode: 'insensitive' } }
                    ]
                })
            },
            orderBy: {
                [sortBy]: order
            },
            include: {
                dependsOn: true,
                dependentTasks: true
            }
        });

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const task = await prisma.task.findUnique({
            where: { id },
            include: {
                dependsOn: true,
                dependentTasks: true
            }
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error('Get task by ID error:', error);
        res.status(500).json({ message: 'Failed to fetch task' });
    }
});



// Update Task
// PUT /api/tasks/:id
// Body: same as POST (any fields to update)
router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;

        const task = await prisma.task.update({
            where: { id },
            data
        });

        res.status(200).json(task);
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ message: 'Failed to update task' });
    }
});

// Delete Task
// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        await prisma.task.delete({
            where: { id }
        });

        res.status(200).json({message:"Task Deleted"});
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ message: 'Failed to delete task' });
    }
});

// Get Task Dependencies for a Task
router.get('/:id/dependencies', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = await prisma.task.findUnique({
            where: { id },
            include: {
                dependsOn: true,
                dependentTasks: true
            }
        });

        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json({
            dependsOn: task.dependsOn,
            dependentTasks: task.dependentTasks
        });
    } catch (error) {
        console.error('Get dependencies error:', error);
        res.status(500).json({ message: 'Failed to fetch dependencies' });
    }
});

router.post('/:id/comments', async (req, res) => {
    try {
        const { message, userId } = req.body;
        const taskId = parseInt(req.params.id);

        if (!message || !userId || isNaN(taskId)) {
            return res.status(400).json({ error: 'Missing or invalid message, userId, or taskId' });
        }

        const taskExists = await prisma.task.findUnique({ where: { id: taskId } });
        if (!taskExists) return res.status(404).json({ error: 'Task not found' });

        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) return res.status(404).json({ error: 'User not found' });

        const comment = await prisma.comment.create({
            data: {
                message,
                userId,
                taskId,
            },
            include: {
                user: true,
            }
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/:id/assign', async (req, res) => {
    const taskId = parseInt(req.params.id);
    const { userId } = req.body;
  
    try {
      // 🔍 Check if user exists
      const userExists = await prisma.user.findUnique({
        where: { id: userId }
      });
  
      if (!userExists) {
        return res.status(404).json({ message: `User with ID ${userId} does not exist.` });
      }
  
      // ✅ Proceed with assignment
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: { userId }
      });
  
      // 📢 Simulate notification
      const notification = {
        message: `Task #${taskId} has been assigned to user #${userId}`
      };
  
      res.status(200).json({ task: updatedTask, notification });
    } catch (error) {
      console.error('Assign task error:', error);
      res.status(500).json({ message: 'Failed to assign task' });
    }
  });
  
// router.post(':id/message',async(req,res)=>{

// })

module.exports = router
