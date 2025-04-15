# node_assignment
Backend Application

Signup 
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
