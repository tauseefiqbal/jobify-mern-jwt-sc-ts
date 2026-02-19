# Jobify

A full-stack MERN (MongoDB, Express, React, Node.js) job tracking application that helps users manage their job applications efficiently. Track your job search progress, monitor application statuses, and visualize your job hunting statistics.

## Features

### Authentication & Authorization
- User registration and login with JWT authentication
- Cookie-based session management
- Role-based access control (Admin & User roles)
- Rate limiting on authentication endpoints (20 requests per 15 minutes)
- Test user protection

### Job Management
- Create, read, update, and delete job applications
- Track job status: Pending, Interview, Declined
- Categorize by job type: Full-time, Part-time, Internship
- Search jobs by position or company name
- Filter jobs by status and type
- Sort jobs by newest, oldest, or alphabetically
- Pagination support (10 jobs per page)

### Statistics & Analytics
- Dashboard with visual statistics
- Job application status breakdown
- Monthly application trends
- Area and bar charts for data visualization
- Admin panel with application-wide statistics

### User Profile
- Update user information (name, last name, email, location)
- Profile management

### UI/UX Features
- Responsive design
- Dark/Light theme toggle
- Toast notifications for user feedback
- Loading states
- Error handling with custom error pages
- Big sidebar for desktop
- Small collapsible sidebar for mobile

## Tech Stack

### Frontend
- **React** 19.2.4 - UI library
- **React Router DOM** 7.13.0 - Client-side routing
- **TanStack React Query** 5.90.21 - Server state management
- **Styled Components** 6.3.9 - CSS-in-JS styling
- **Recharts** 3.7.0 - Data visualization
- **Axios** 1.13.5 - HTTP client
- **React Toastify** 11.0.5 - Toast notifications
- **React Icons** 5.5.0 - Icon library
- **Day.js** 1.11.19 - Date manipulation
- **Vite** 7.3.1 - Build tool

### Backend
- **Node.js** with **Express** 4.22.1 - Server framework
- **MongoDB** with **Mongoose** 9.2.1 - Database
- **bcryptjs** 3.0.3 - Password hashing
- **jsonwebtoken** 9.0.3 - JWT authentication
- **cookie-parser** 1.4.7 - Cookie handling
- **express-validator** 7.3.1 - Input validation
- **express-async-errors** 3.1.1 - Async error handling

### Security & Performance
- **Helmet** 8.1.0 - HTTP headers security
- **express-rate-limit** 8.2.1 - Rate limiting
- **express-mongo-sanitize** 2.2.0 - NoSQL injection prevention
- **Morgan** 1.10.1 - HTTP request logger

### Development Tools
- **Nodemon** 3.1.11 - Auto-restart server
- **Concurrently** 9.2.1 - Run multiple commands
- **ESLint** 9.39.1 - Code linting

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jobify
   ```

2. **Install dependencies for both server and client**
   ```bash
   npm run setup-project
   ```
   This command installs dependencies for both the root server and the client folder.

   Alternatively, install manually:
   ```bash
   # Install server dependencies
   npm install

   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5100

# Database
MONGO_URL=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
```

### Environment Variable Descriptions:

- `NODE_ENV` - Application environment (development/production)
- `PORT` - Server port (default: 5100)
- `MONGO_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `JWT_EXPIRES_IN` - JWT token expiration time

## Running the Application

### Development Mode

Run both client and server concurrently:
```bash
npm run dev
```

This command starts:
- Backend server on `http://localhost:5100`
- Frontend dev server on `http://localhost:5173` (Vite default)

### Run Server Only
```bash
npm run server
```

### Run Client Only
```bash
npm run client
```

### Production Build

1. **Build the client**
   ```bash
   cd client
   npm run build
   cd ..
   ```

2. **Start the server**
   ```bash
   npm start
   ```

The production server serves the built React app from the `client/dist` folder.

## API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint | Description | Public |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | ✓ |
| POST | `/login` | Login user | ✓ |
| GET | `/logout` | Logout user | ✓ |

### Job Routes (`/api/v1/jobs`)

All job routes require authentication.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all jobs (with pagination, search, filter) |
| POST | `/` | Create new job |
| GET | `/stats` | Get job statistics |
| GET | `/:id` | Get single job |
| PATCH | `/:id` | Update job |
| DELETE | `/:id` | Delete job |

### User Routes (`/api/v1/users`)

All user routes require authentication.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/current-user` | Get current user info |
| PATCH | `/update-user` | Update user profile |
| GET | `/admin/app-stats` | Get app statistics (admin only) |

## Project Structure

```
jobify/
├── client/                  # Frontend React application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── assets/         # Images, CSS, styled-component wrappers
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Root component
│   │   ├── index.css       # Global styles
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── controllers/            # Route controllers
│   ├── authController.js
│   ├── jobController.js
│   └── userController.js
├── errors/                 # Custom error classes
│   └── customErrors.js
├── middleware/             # Express middleware
│   ├── authMiddleware.js
│   ├── errorHandlerMiddleware.js
│   └── validationMiddleware.js
├── models/                 # Mongoose models
│   ├── JobModel.js
│   └── UserModel.js
├── routes/                 # Express routes
│   ├── authRouter.js
│   ├── jobRouter.js
│   └── userRouter.js
├── utils/                  # Server utilities
│   ├── constants.js
│   ├── passwordUtils.js
│   └── tokenUtils.js
├── .env                    # Environment variables (create this)
├── package.json
├── populate.js             # Database seeding script
└── server.js               # Express server entry point
```

## Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  lastName: String,
  location: String,
  role: String (enum: 'user', 'admin')
}
```

### Job Model
```javascript
{
  company: String,
  position: String,
  jobStatus: String (enum: 'pending', 'interview', 'declined'),
  jobType: String (enum: 'full-time', 'part-time', 'internship'),
  jobLocation: String,
  createdBy: ObjectId (ref: 'User'),
  timestamps: true
}
```

## Key Features Implementation

### Security Features
- **Password Hashing**: Uses bcryptjs for secure password storage
- **JWT Authentication**: Stateless authentication with HTTP-only cookies
- **Rate Limiting**: Prevents brute force attacks on auth endpoints
- **Helmet**: Sets secure HTTP headers
- **MongoDB Sanitization**: Prevents NoSQL injection attacks
- **Input Validation**: Server-side validation using express-validator

### State Management
- **React Query**: Handles server state, caching, and data synchronization
- **React Router**: Client-side routing with loader and action functions
- **React Context**: Shares user data across components via outlet context

### Error Handling
- Custom error classes for different HTTP status codes
- Global error handler middleware
- User-friendly error messages
- Error boundaries for React components

## Default Users

The first registered user automatically becomes an admin. Subsequent users have the 'user' role by default.

## Development

### Linting
```bash
cd client
npm run lint
```

### Preview Production Build
```bash
cd client
npm run preview
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository.

---

