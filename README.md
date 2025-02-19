Simple REST-based chat application using RabbitMQ, MongoDB, User Service, Chat Service, Notification Service, Gateway, and Nginx Reverse Proxy.
Do execute this command each serice inside:
npm install
npm start
1. User Registration:
To register a new user, you need to send a POST request to the /register endpoint with the user's details.

Example Request:
curl -X POST http://localhost:3000/api/users/register -H "Content-Type: application/json" -d '{"username": "newuser", "password": "password123"}'

Example Response:
If the registration is successful, you should receive a response like:

json
{
  "message": "User registered successfully"
}

2. User Login:
To log in a registered user, you need to send a POST request to the /login endpoint with the user's credentials.

Example Request:

curl -X POST http://localhost:3000/api/users/login -H "Content-Type: application/json" -d '{"username": "newuser", "password": "password123"}'

Example Response:
If the login is successful, you should receive a response with a JWT token:

json
{
  "token": "your_jwt_token"
}

3. Retrieve User Information
To retrieve user information, you can implement a new endpoint in your User Service, for example, /profile, that requires a valid JWT token.

Example Request:
To retrieve user information, send a GET request to the /profile endpoint with the JWT token in the Authorization header.

curl -X GET http://localhost:3000/api/users/profile -H "Authorization: Bearer your_jwt_token"
E: curl -X GET http://localhost:3000/api/users/profile \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1ODM1Mjk0YTNjNGFmMGFhNWJmMTMiLCJpYXQiOjE3Mzk5NTUwNTEsImV4cCI6MTczOTk1ODY1MX0.zYyVcOyB285reZmlsNkIDbeAdBfRsH2ZcECjXfZjRLQ"

Example Response:
If the token is valid and the user is found, you should receive a response like:

json
{
  "username": "newuser"
}

With these endpoints, you can now register new users, log them in, and retrieve their information using the JWT token.
