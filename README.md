# node_assignment
Backend Application

Signup:

The encrypted password will be  
"$2b$10$I23ohJYbE/DgUbYTQmGxA.lFD7jhR452mZzLVmfkCvFEQTamGOV1G"

POST /api/auth/signup
payload :
{
  "email": "test@gmail.com",
  "password": "12345678",
  "firstName": "Test",
  "lastName": "Test"
}

POST /api/auth/login
payload :
{
  "email": "test@gmail.com",
  "password": "12345678"
}

POST /api/tasks
{
  "title": "Design Homepage",
  "description": "Create Figma wireframes",
  "projectId": 1,
  "categoryId": 2,
  "dueDate": "2025-05-01",
  "priority": "high",
  "estimatedTime": 8,
  "status": "not_started",
  "attachmentPath": "path/to/file",
  "recurrence": "weekly",
  "dependsOnId": 3,
  "userId": 1
}
GET /api/tasks ( fetch all tasks)
GET /api/tasks/:id ( fetch specify task details)
Query Parameters (optional):
status, priority, dueDate, categoryId, search, sortBy, order
PUT /api/tasks/:id
DELETE /api/tasks/:id
GET /api/tasks/:id/dependencies

Project

POST /api/projects
{
  "name": "Project Name",
  "description": "Optional description"
}
Get all Projects
GET /api/projects
Project by ID
GET /api/projects/:id
Update Project
PUT /api/projects/:id
DELETE /api/projects/:id

Category

GET /api/categories
GET /api/categories/:id
POST /api/categories
{
  "name": "Development"
}
PUT /api/categories/:id
{
  "name": "New Category Name"
}
Delete Category
DELETE /api/categories/:id