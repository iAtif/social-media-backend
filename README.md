# Simple Social Media Application - Backend

This is the backend for a simple social media application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with user authentication and authorization features. This backend service handles user registration, login, post creation, post interaction, and post management with secure authentication using JWT.

## Features

1. **User Authentication**

   - Sign up and log in.
   - Secure authentication with JWT.

2. **Post Creation**

   - Create posts with images and descriptions.

3. **Post Interaction**

   - Like posts created by others.
   - See the number of likes for each post.

4. **Post Management**
   - Only the creator can edit or delete their post.

## Requirements

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT for user authentication.

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/iAtif/social-media-backend.git
   cd social-media-backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Environment Variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=5000
   MONGODB_URI=your-mongodb-uri
   SECRET_KEY=your-jwt-secret
   ```

4. **Run the application:**

   ```sh
   npm start

   ```

5. **Frontend Code:**

   The frontend code is available in a separate repository. You can find it [here](https://github.com/iAtif/social-media-frontend.git).

## API Endpoints

### Authentication

- **POST /auth/register**: Register a new user
- **POST /auth/login**: Login a user

### Posts

- **POST /post**: Create a new post (authenticated)
- **GET /post**: Get all posts
- **PUT /post/:postId**: Update a post (authenticated, post owner only)
- **DELETE /post/:postId**: Delete a post (authenticated, post owner only)
- **PUT /post/:postId/like**: Like a post (authenticated)
- **PUT /post/:postId/unlike**: Unlike a post (authenticated)
