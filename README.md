# Todo Backend API

This repository contains the backend API for a todo application. It provides endpoints for user authentication (signup and login) as well as CRUD operations for managing todos.

## Technologies Used

- **Express.js**: Web framework for Node.js used to build the API endpoints.
- **JSON Web Tokens (JWT)**: For user authentication and authorization.
- **bcrypt**: Library for hashing passwords securely.
- **fs**: Node.js module for file system operations.
- **path**: Node.js module for working with file and directory paths.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Dasti-dev/todo-backend.git

2. Navigate to the project directory:
```bash
   cd todo-backend
```

3. Install dependencies:
```bash
  npm install
```

4. Start the server:
```bash
  npm start
```

## Endpoints

### User Authentication
- POST `/signup`: Register a new user.
- POST `/login`: Log in an existing user.

### Todos
- POST `/todos/create`: Create a new todo.
- GET `/todos/getAll`: Get all todos.
- PUT `/todos/update/:id`: Update an existing todo by ID.
- DELETE `/todos/delete/:id`: Delete a todo by ID.

## Authentication
User authentication is handled using JWT (JSON Web Tokens). To access protected routes, include the JWT token in the Authorization header of the request.

```bash
  Authorization: Bearer YOUR_JWT_TOKEN_HERE
```
