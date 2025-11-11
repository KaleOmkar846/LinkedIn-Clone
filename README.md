# Simple LinkedIn Clone

A full-stack social media web application built with React, Node.js, Express, and MongoDB.

## Features

- 🎨 Modern, professional UI/UX design with gradient effects
- 🔐 User registration and authentication
- ✍️ Create text-based posts
- ✏️ Edit your own posts
- 🗑️ Delete your own posts
- 📰 View global feed of all posts (sorted newest first)
- 📱 Fully responsive design for mobile and desktop
- 🔒 Session-based authentication with Passport.js
- 🎭 Smooth animations and transitions
- 💫 Interactive hover effects and visual feedback

## Technology Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Vite

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js (passport-local, passport-local-mongoose)
- Express Session
- Joi (validation)
- CORS

## Project Structure

```
linkedin-clone/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # AuthContext
│   │   ├── pages/         # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                # Node.js backend
│   ├── config/           # Passport configuration
│   ├── middleware/       # Auth middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── app.js            # Server entry point
│   └── package.json
│
└── package.json          # Root package.json with scripts
```

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd linkedin-clone
   ```

2. **Install dependencies**

   ```bash
   npm run install-all
   ```

   Or manually:

   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Configure environment variables**

Create a `.env` file in the `server` directory:

```env
PORT=8080
 MONGODB_URI=mongodb://localhost:27017/linkedin-clone
 SESSION_SECRET=your-secret-key-change-this-in-production
```

4. **Start MongoDB**

   Make sure MongoDB is running on your system:

   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Seed the database with sample data (Optional)**

   Populate the database with sample users and posts:

   ```bash
   cd server
   npm run seed
   ```

   This will create:

   - 5 sample users (all with password: `password123`)
   - 20 sample posts from various users

   Sample login credentials:

   - Email: `john.doe@example.com`
   - Password: `password123`

## Running the Application

### Development Mode

**Option 1: Run both client and server together (recommended)**

```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 (Backend):

```bash
npm run server
```

Terminal 2 (Frontend):

```bash
npm run client
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080

## API Endpoints

### Authentication Routes (`/api/users`)

- `POST /api/users/register` - Register a new user

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /api/users/login` - Login user

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /api/users/logout` - Logout user

- `GET /api/users/me` - Get current user (protected)

### Post Routes (`/api/posts`)

- `POST /api/posts` - Create a new post (protected)

  ```json
  {
    "content": "This is my post content"
  }
  ```

- `GET /api/posts` - Get all posts (public)

- `PUT /api/posts/:id` - Update a post (protected, author only)

  ```json
  {
    "content": "Updated post content"
  }
  ```

- `DELETE /api/posts/:id` - Delete a post (protected, author only)

## Usage

1. **Sign Up**: Navigate to `/signup` and create a new account
2. **Log In**: Navigate to `/login` and log in with your credentials
3. **Create Post**: Once logged in, use the create post form on the home page
4. **Edit Post**: Click the "Edit" button on your own posts to modify them
5. **Delete Post**: Click the "Delete" button on your own posts to remove them
6. **View Feed**: All posts are displayed on the home page, sorted by newest first
7. **Log Out**: Click the logout button in the navbar

**Note:** You can only edit and delete your own posts. Edit/Delete buttons only appear on posts you've created.

## Scripts

### Root Directory

- `npm run dev` - Run both client and server concurrently
- `npm run client` - Run only the frontend
- `npm run server` - Run only the backend
- `npm run install-all` - Install all dependencies

### Client Directory

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server Directory

- `npm start` - Start server with Node
- `npm run dev` - Start server with Nodemon (auto-restart)
- `npm run seed` - Seed database with sample data

## Database Schema

### User Model

```javascript
{
  email: String (required, unique),
  // password handled by passport-local-mongoose
}
```

### Post Model

```javascript
{
  content: String (required),
  author: ObjectId (ref: 'User', required),
  createdAt: Date (default: Date.now)
}
```

## Security Features

- Password hashing with passport-local-mongoose
- Session-based authentication
- Protected routes on both frontend and backend
- CORS configuration for cross-origin requests
- Input validation with Joi

## Future Enhancements

- User profiles
- Like and comment functionality
- Follow/unfollow users
- User-specific feeds
- Image uploads
- Real-time notifications
- Search functionality

## License

ISC

## Author

Your Name
