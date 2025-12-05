
### Blog API — RESTful Backend with Commenting System

A full-featured blogging API built with Node.js, Express, and PostgreSQL, supporting authentication, posts, comments, profile uploads, and search. This project is designed to simulate a real-world backend service with modular architecture, secure routing, relational data modeling, and proper documentation.

### Project Overview

This backend API powers a simple blogging platform. Users can register, log in, upload a profile picture, create posts, comment on posts, update their content, and perform searches.
It demonstrates essential backend engineering concepts:

REST API Design

SQL schema modeling

Authentication with JWT

File uploads

One-to-many relationships (posts → comments)

Error handling & validation

Pagination and search

Modular route & controller architecture

### Features (Use Cases)
### Authentication

Register user

Login user

Get logged-in user info (/me)

Upload profile picture

### Blog Posts

Create a post

Retrieve all posts with pagination

View a single post with comments (JOIN query)

Update a post (partial updates supported)

Delete a post (and cascade delete comments)

### Comments

Retrieve all comments for a post

Add a new comment to a post

Delete specific comments

### Search

Search for posts using keywords (title or content)

### Additional Features

Connection pooling

Input validation

SQL injection protection

Global error handler

Rate limiting

Sample SQL seed data

Unit tests for several endpoints

### Database Schema (PostgreSQL)
Tables

users

posts

comments

Relationships

One user → many posts

One post → many comments

Cascade delete ensures no orphaned comments

Provided SQL Scripts

schema.sql → creates all tables

seed.sql → inserts sample users, posts, and comments

drop.sql → teardown script

### API Endpoints
### Authentication
### Method	     Endpoint	                Description
POST	     /auth/register	               Register a new user
POST	     /auth/login                 	Login and receive JWT
GET	         /me Get                             the authenticated user's info
POST	     /profile_upload	                    Upload profile picture
### Posts
### Method	       Endpoint	                              Description
GET	         /posts?limit=10&offset=0	                 List posts with pagination
GET	         /posts/:id	                                  Get a single post with comments
POST	    /posts	                                      Create a post (validated)
PUT     	/posts/:id	                                   Update (partial updates allowed)
DELETE	    /posts/:id	                                       Delete post + comments (cascade)
### Comments
### Method	   Endpoint                                 	Description
GET	       /posts/:id/comments	                                  Get comments for a post
POST	    /posts/:id/comments                                 	Add comment to a post
DELETE	    /comments/:id	                            Delete specific comment
### Search
### Method	        Endpoint                                 	Description
GET	                /search?q=keyword                                             	Search posts by title/content


### Project Structure
src/
│── controllers/
│── routes/
│── middleware/
│── db/
│   ├── db.js
│   ├── initTables.js
│── uploads/ (profile pictures)
│── server.js
README.md
.env

### Environment Variables

Create a .env file:

PORT=4000
DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/blogapi
JWT_SECRET=your_secret_here

### Running the Project

1 Clone the project
git clone  https://github.com/EbakocorneliusEmeh/blogapi.git

2. Install dependencies
npm install

3. Initialize database
node src/db/initTables.js

4. Start development server
npm run dev


Server runs on:

http://localhost:4000

### Testing the API

Use Insomnia  Postman or curl.

Example. Register User
POST /auth/register

{
  "username": "john",
  "email": "john@example.com",
  "password": "123456"
}

Example. Auth Header
Authorization: Bearer <jwt_token>

Example. Upload profile picture

Form-data →

key. profile   (type: file)

### Search Example
GET /search?q=node

### Unit Tests

Includes tests for.

Authentication

Posts creation

Comment creation

Run tests:

npm test

### Code Quality & Best Practices Followed

 Modular routes/controllers
 Parameterized SQL queries (Prevents SQL injection)
 Global error handler
 bcrypt password hashing
 JWT authentication
 Async/await everywhere
 Pagination & search for efficiency

### Sample Data Included

3 users

5 posts

10 comments

Added via seed.sql

### Assumptions

Users can only edit/delete their own posts/comments

File uploads stored in /uploads directory

Cascade delete for comments when a post is removed

No admin roles required