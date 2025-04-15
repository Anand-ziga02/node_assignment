# node_assignment
Backend Application

Signup:

The encrypted password will be  
"$2b$10$I23ohJYbE/DgUbYTQmGxA.lFD7jhR452mZzLVmfkCvFEQTamGOV1G"

api : POST "http://localhost:3456/api/auth/signup"
payload :
{
  "email": "test@gmail.com",
  "password": "12345678",
  "firstName": "Test",
  "lastName": "Test"
}

api : POST "http://localhost:3456/api/auth/login"
payload :
{
  "email": "test@gmail.com",
  "password": "12345678"
}
