Simple REST-based chat application using RabbitMQ, MongoDB, User Service, Chat Service, Notification Service, Gateway, and Nginx Reverse Proxy.
Do execute this command each service inside:
npm install
npm start
1. User Registration:
To register a new user, you need to send a POST request to the /register endpoint with the user's details.
Example Request:
curl -X POST http://localhost:3000/api/users/register -H "Content-Type: application/json" -d '{"username": "newuser", "password": "password123"}'

Example Response:
If the registration is successful, you should receive a response like:
{
  "message": "User registered successfully"
}
2. User Login:
To log in a registered user, you need to send a POST request to the /login endpoint with the user's credentials.
Example Request:
curl -X POST http://localhost:3000/api/users/login -H "Content-Type: application/json" -d '{"username": "newuser", "password": "password123"}'
Example Response:
If the login is successful, you should receive a response with a JWT token:
{
  "token": "your_jwt_token"
}
3. Retrieve User Information:
To retrieve user information, you can implement a new endpoint in your User Service, for example, /profile, that requires a valid JWT token.
Example Request:
To retrieve user information, send a GET request to the /profile endpoint with the JWT token in the Authorization header.
curl -X GET http://localhost:3000/api/users/profile -H "Authorization: Bearer your_jwt_token"
Ex: curl -X GET http://localhost:3000/api/users/profile \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I1ODM1Mjk0YTNjNGFmMGFhNWJmMTMiLCJpYXQiOjE3Mzk5NTUwNTEsImV4cCI6MTczOTk1ODY1MX0.zYyVcOyB285reZmlsNkIDbeAdBfRsH2ZcECjXfZjRLQ"
Example Response:
If the token is valid and the user is found, you should receive a response like:
{
  "username": "newuser"
}
With these endpoints, you can now register new users, log them in, and retrieve their information using the JWT token.
For DB storage Mongo DB and RabbitMq Message Queue I used Docker  container:
RabbitMq:
docker run -d -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin123 rabbitmq:4.0-management
MongoDb:
docker run --name mongodb -p 27017:27017 -d -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin123 mongodb/mongodb-community-server:latest
To Login into MongoDB and create Sample User:
docker exec -it mongodb mongosh -u admin -p admin123 --authenticationDatabase admin
db.createUser({
  user: "test",
  pwd: "test@123",
  roles: [ { role: "readWrite", db: "users" } ]
})
