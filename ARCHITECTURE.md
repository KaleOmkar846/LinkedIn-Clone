# LinkedIn Clone - Modular Architecture

This document describes the new modular architecture of the LinkedIn Clone application.

## 📁 Project Structure

### Client (`/client/src/`)

```
client/src/
├── config/              # Configuration files
│   └── axios.js        # Axios instance with interceptors
├── constants/           # Application constants
│   └── index.js        # API endpoints, messages, etc.
├── context/            # React Context providers
│   └── AuthContext.jsx # Authentication context
├── hooks/              # Custom React hooks
│   ├── useForm.js      # Form state management
│   └── usePosts.js     # Posts CRUD operations
├── services/           # API service layer
│   ├── authApi.js      # Authentication API calls
│   └── postsApi.js     # Posts API calls
├── utils/              # Utility functions
│   └── helpers.js      # Common helper functions
├── components/         # React components
├── pages/             # Page components
└── assets/            # Static assets
```

### Server (`/server/`)

```
server/
├── config/             # Configuration files
│   ├── database.js    # MongoDB connection
│   ├── passport.js    # Passport authentication
│   └── session.js     # Session configuration
├── controllers/        # Route controllers (business logic)
│   ├── authController.js
│   └── postsController.js
├── middleware/         # Custom middleware
│   └── auth.js        # Authentication middleware
├── models/            # Mongoose models
│   ├── User.js
│   └── Post.js
├── routes/            # Route definitions
│   ├── auth.js
│   └── posts.js
├── validators/        # Request validation schemas
│   ├── authValidator.js
│   └── postValidator.js
└── app.js            # Application entry point
```

## 🏗️ Architecture Patterns

### Client-Side Architecture

#### 1. **Service Layer Pattern**

All API calls are centralized in service files:

- `authApi.js` - Authentication endpoints
- `postsApi.js` - Posts endpoints

**Benefits:**

- Single source of truth for API calls
- Easy to mock for testing
- Consistent error handling
- Type documentation via JSDoc

#### 2. **Custom Hooks Pattern**

Reusable logic extracted into custom hooks:

- `usePosts.js` - Posts state management and CRUD operations
- `useForm.js` - Form state and validation

**Benefits:**

- Separation of concerns
- Reusable across components
- Easier testing
- Cleaner component code

#### 3. **Utility Functions**

Common functions in `utils/helpers.js`:

- `formatDate()` - Date formatting
- `getInitials()` - Get user initials
- `getUsernameFromEmail()` - Extract username
- `getRandomNumber()` - Generate random numbers

**Benefits:**

- DRY principle
- Consistent behavior
- Easy to unit test

#### 4. **Configuration Management**

Centralized configuration:

- `config/axios.js` - HTTP client configuration
- `constants/index.js` - API endpoints and messages

**Benefits:**

- Easy environment switching
- Single point of configuration
- Type-safe endpoint URLs

### Server-Side Architecture

#### 1. **MVC Pattern**

Clear separation of concerns:

- **Models** - Data structures (User, Post)
- **Controllers** - Business logic
- **Routes** - HTTP endpoints

#### 2. **Controller Pattern**

All route handlers moved to controllers:

- `authController.js` - Auth operations
- `postsController.js` - Post operations

**Benefits:**

- Thin routes, fat controllers
- Easier to test business logic
- Better code organization

#### 3. **Validation Layer**

Joi schemas separated into validators:

- `authValidator.js` - User validation
- `postValidator.js` - Post validation

**Benefits:**

- Reusable validation schemas
- Centralized validation logic
- Easy to modify validation rules

#### 4. **Configuration Module**

Database and session config extracted:

- `config/database.js` - MongoDB setup
- `config/session.js` - Session configuration

**Benefits:**

- Clean entry point
- Environment-specific configs
- Graceful error handling

## 🔄 Data Flow

### Client Request Flow

```
Component → Custom Hook → API Service → Axios Instance → Server
```

### Server Request Flow

```
Route → Middleware → Validator → Controller → Model → Database
```

## 🚀 Usage Examples

### Client-Side

#### Using the Posts Hook

```jsx
import { usePosts } from "../hooks/usePosts";

function MyComponent() {
  const { posts, loading, createPost, updatePost, deletePost } = usePosts();

  const handleCreate = async () => {
    const result = await createPost("Hello World");
    if (result.success) {
      console.log("Post created!");
    }
  };

  return <div>{/* ... */}</div>;
}
```

#### Using API Services Directly

```jsx
import postsApi from "../services/postsApi";

const fetchData = async () => {
  try {
    const data = await postsApi.getAllPosts();
    console.log(data.posts);
  } catch (error) {
    console.error(error);
  }
};
```

### Server-Side

#### Adding a New Route

1. Create validator in `validators/`
2. Create controller in `controllers/`
3. Add route in `routes/`

Example:

```javascript
// validators/commentValidator.js
export const commentSchema = Joi.object({
  text: Joi.string().min(1).required(),
});

// controllers/commentsController.js
export const createComment = async (req, res) => {
  const { error, value } = commentSchema.validate(req.body);
  // ... business logic
};

// routes/comments.js
router.post("/", isLoggedIn, createComment);
```

## 📦 Dependencies

### Client

- `axios` - HTTP client
- `react-router-dom` - Routing
- Configuration via environment variables

### Server

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `passport` - Authentication
- `joi` - Validation
- Configuration via `.env` file

## 🔐 Environment Variables

### Client (`.env`)

```env
VITE_API_BASE_URL=http://localhost:8080
```

### Server (`.env`)

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/linkedin-clone
SESSION_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## 🧪 Testing Strategy

### Client

- Unit test utility functions in `utils/`
- Unit test custom hooks with React Testing Library
- Mock API services for component tests

### Server

- Unit test controllers
- Unit test validators
- Integration test routes
- Mock database for tests

## 🔧 Maintenance

### Adding New Features

#### Client:

1. Create API service methods
2. Create custom hook if needed
3. Update components to use services/hooks

#### Server:

1. Create model (if needed)
2. Create validator
3. Create controller
4. Add routes

### Modifying Existing Features

- **API changes**: Update service files
- **Validation changes**: Update validator files
- **Business logic**: Update controllers
- **UI logic**: Update components/hooks

## 📈 Benefits of This Architecture

1. **Maintainability** - Clear separation of concerns
2. **Scalability** - Easy to add new features
3. **Testability** - Isolated units for testing
4. **Reusability** - Shared logic in hooks and utilities
5. **Consistency** - Standardized patterns throughout
6. **Collaboration** - Clear file organization
7. **Type Safety** - JSDoc comments for documentation

## 🎯 Best Practices

1. **Always use services** for API calls, never axios directly in components
2. **Extract reusable logic** into custom hooks
3. **Keep controllers thin** - delegate to service layer if needed
4. **Validate all inputs** using Joi schemas
5. **Use constants** for API endpoints and messages
6. **Document functions** with JSDoc comments
7. **Handle errors** consistently across the app

## 🚦 Migration Notes

All existing functionality has been preserved. The refactoring:

- ✅ Maintains the same API contracts
- ✅ Preserves all business logic
- ✅ Improves code organization
- ✅ Adds better error handling
- ✅ Makes the codebase more maintainable

No breaking changes - the application works exactly as before, but with a much cleaner architecture!
