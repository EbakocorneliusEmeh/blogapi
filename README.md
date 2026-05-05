# Blog API

Blog API is a Node.js and Express REST API backed by PostgreSQL. It supports user authentication, post management, comments, profile uploads, and keyword search. The project is organized as a small backend service with route, controller, middleware, and database layers.

## What the project does

This API lets users:

- Register and log in with JWT authentication
- View their profile information
- Create, read, update, and delete blog posts
- Add and remove comments on posts
- Upload a profile picture
- Search posts by title or content

The app also includes request validation, rate limiting, parameterized SQL queries, and automatic table creation on startup.

## Features

- Authentication with bcrypt and JWT
- CRUD for posts
- Comments on posts
- Profile upload support
- Search endpoint for posts
- Input validation with `express-validator`
- Rate limiting with `express-rate-limit`
- PostgreSQL connection pooling
- Global error handling

## Project Structure

```text
src/
  app.js
  server.js
  controllers/
  db/
  middleware/
  routes/
  tests/
migrations/
README.md


## Implemented Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Log in and receive a JWT
- `GET /auth/me` - Get the authenticated user's profile

### Users

- `POST /users/profile_upload` - Upload a profile picture

### Posts

- `GET /posts?limit=10&offset=0` - Get all posts with pagination
- `GET /posts/:id` - Get a single post and its comments
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

### Comments

- `GET /posts/:id/comments` - Get comments for a post
- `POST /posts/:id/comments` - Add a comment to a post
- `DELETE /comments/:id` - Delete a comment

### Search

- `GET /search?q=keyword` - Search posts by title or content

## Database

The application uses PostgreSQL. Tables are created automatically on startup by `rc/db/createTables.js

Database tables:

- users
- posts
- comments

Relationships:

- One user can create many posts
- One user can write many comments
- One post can have many comments
- Deleting a post cascades to its comments

## Environment Variables

Create a `.env` file in the project root with the values you need for your database:

env
PORT=4000
JWT_SECRET=your_secret_here

# Option 1: use DATABASE_URL
DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/blogapi

# Option 2: use individual connection fields
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blogapi
DB_USER=postgres
DB_PASSWORD=your_password

# Optional upload folder
UPLOAD_DIR=uploads


## How To Run The Project

1. Install dependencies

bash
npm install


2. Set up your PostgreSQL database and `.env`

3. Start the development server

bash
npm run dev


4. Or start the production server

```bash
npm start
```

The server runs on:

text
http://localhost:4000


## Example Requests

### Register

http
POST /auth/register
Content-Type: application/json

json
{
  "username": "john",
  "email": "john@example.com",
  "password": "123456"
}


### Login

http
POST /auth/login
Content-Type: application/json


json
{
  "email": "john@example.com",
  "password": "123456"
}


### Authenticated Request

http
Authorization: Bearer <jwt_token>


### Upload Profile Picture

Use `multipart/form-data` with:

- key: `profile`
- value: file upload

## Notes

- The app uses parameterized SQL queries to reduce SQL injection risk.
- Comments are deleted automatically when their parent post is deleted.
- If you want to reset the database manually, use the SQL files in `migrations/`.

## Submission Reminder

If your reviewer asked for a pull request link, make sure the PR URL is included in the submission notes or description.
