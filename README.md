W# Jobify

A full-stack MERN (MongoDB, Express, React, Node.js) job tracking application that helps users manage their job applications efficiently. Track your job search progress, monitor application statuses, and visualize your job hunting statistics.

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
  - [Authentication \& Authorization](#authentication--authorization)
  - [Job Management](#job-management)
  - [Statistics \& Analytics](#statistics--analytics)
  - [User Profile](#user-profile)
  - [UI/UX](#uiux)
  - [Security](#security)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Security \& Performance](#security--performance)
  - [Development Tools](#development-tools)
- [Deployment](#deployment)
- [Test and Admin Users Credentials](#test-and-admin-users-credentials)
  - [Seeding the Database](#seeding-the-database)
- [How to Use App for Regular User](#how-to-use-app-for-regular-user)
  - [Getting Started](#getting-started)
  - [Managing Jobs](#managing-jobs)
  - [Viewing Statistics](#viewing-statistics)
  - [Profile Management](#profile-management)
- [How to Use App for Admin User](#how-to-use-app-for-admin-user)
  - [Admin Login](#admin-login)
  - [Admin Dashboard](#admin-dashboard)
  - [Admin Capabilities](#admin-capabilities)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Build](#production-build)
- [API Endpoints](#api-endpoints)
  - [Authentication Routes (`/api/v1/auth`)](#authentication-routes-apiv1auth)
  - [Job Routes (`/api/v1/jobs`)](#job-routes-apiv1jobs)
  - [User Routes (`/api/v1/users`)](#user-routes-apiv1users)
- [Project Structure](#project-structure)
- [Database Models](#database-models)
  - [User Model](#user-model)
  - [Job Model](#job-model)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## Features

### Authentication & Authorization

- ✅ User registration and login with JWT authentication
- ✅ Cookie-based session management with HTTP-only secure cookies
- ✅ Role-based access control (Admin & User roles)
- ✅ Rate limiting on authentication endpoints (20 requests per 15 minutes)
- ✅ Test user protection (read-only demo mode)

### Job Management

- ✅ Create, read, update, and delete job applications
- ✅ Track job status: Pending, Interview, Declined
- ✅ Categorize by job type: Full-time, Part-time, Internship
- ✅ Search jobs by position or company name
- ✅ Filter jobs by status and type
- ✅ Sort jobs by newest, oldest, or alphabetically (A-Z, Z-A)
- ✅ Pagination support (10 jobs per page)

### Statistics & Analytics

- ✅ Dashboard with visual statistics
- ✅ Job application status breakdown (Pending, Interview, Declined)
- ✅ Monthly application trends
- ✅ Area and bar charts for data visualization (powered by Recharts)
- ✅ Admin panel with application-wide statistics (total users & jobs)

### User Profile

- ✅ Update user information (name, last name, email, location)
- ✅ Profile management with server-side validation

### UI/UX

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark / Light theme toggle with persistent preference
- ✅ Toast notifications for user feedback
- ✅ Loading states and skeleton screens
- ✅ Custom error pages (404, unauthorized)
- ✅ Big sidebar for desktop navigation
- ✅ Small collapsible sidebar for mobile navigation

### Security

- ✅ Password hashing with bcryptjs
- ✅ HTTP headers protection with Helmet
- ✅ NoSQL injection prevention with express-mongo-sanitize
- ✅ Input validation with express-validator
- ✅ Rate limiting to prevent brute-force attacks

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.4 | UI library |
| React Router DOM | 7.13.0 | Client-side routing |
| TanStack React Query | 5.90.21 | Server state management & caching |
| Styled Components | 6.3.9 | CSS-in-JS styling |
| Recharts | 3.7.0 | Data visualization (charts) |
| Axios | 1.13.5 | HTTP client |
| React Toastify | 11.0.5 | Toast notifications |
| React Icons | 5.5.0 | Icon library |
| Day.js | 1.11.19 | Date formatting |
| Vite | 7.3.1 | Build tool & dev server |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js + Express | 4.22.1 | Server framework |
| MongoDB + Mongoose | 9.2.1 | Database & ODM |
| bcryptjs | 3.0.3 | Password hashing |
| jsonwebtoken | 9.0.3 | JWT authentication |
| cookie-parser | 1.4.7 | Cookie handling |
| express-validator | 7.3.1 | Input validation |
| express-async-errors | 3.1.1 | Async error handling |

### Security & Performance

| Technology | Version | Purpose |
|---|---|---|
| Helmet | 8.1.0 | HTTP headers security |
| express-rate-limit | 8.2.1 | Rate limiting |
| express-mongo-sanitize | 2.2.0 | NoSQL injection prevention |
| Morgan | 1.10.1 | HTTP request logger |

### Development Tools

| Technology | Version | Purpose |
|---|---|---|
| Nodemon | 3.1.11 | Auto-restart server on changes |
| Concurrently | 9.2.1 | Run client & server simultaneously |
| ESLint | 9.39.1 | Code linting |

---

## Deployment

The application is live and deployed on Vercel.

🔗 **Live URL:** [https://jobify-mern-jwt-sc-ts.vercel.app/](https://jobify-mern-jwt-sc-ts.vercel.app/)

> **Note:** The app is hosted on Vercel's starter plan.

---

## Test and Admin Users Credentials

The application comes pre-loaded with **5 users** and **100 sample jobs** (20 jobs per user). Use the credentials below to explore the app:

| # | Name | Email | Password | Role |
|---|------|-------|----------|------|
| 1 | Admin | admin@jobify.com | admin123 | admin |
| 2 | John | john@jobify.com | test1234 | user |
| 3 | Jane | jane@jobify.com | test1234 | user |
| 4 | Bob | bob@jobify.com | test1234 | user |
| 5 | Sara | sara@jobify.com | test1234 | user |

### Seeding the Database

To reset or populate the database with the test users and sample jobs, run:

```bash
node populate.js
```

This will create all 5 users with hashed passwords and distribute 100 jobs from `mockData.json` evenly (20 per user).

---

## How to Use App for Regular User

### Getting Started

1. Launch the App URL and click **Login** (or **Register** to create a new account).
2. Log in with any test user credential (e.g., `john@jobify.com` / `test1234`).
3. You will be redirected to the **Dashboard**.

### Managing Jobs

1. **Add a Job** — From the dashboard home page, fill in the position, company name, job location, job status (Pending / Interview / Declined), and job type (Full-time / Part-time / Internship), then click **Submit**.
2. **View All Jobs** — Click **All Jobs** in the sidebar to see your job listings with pagination.
3. **Search & Filter** — Use the search bar to find jobs by position or company. Filter by status and type, and sort by newest, oldest, or alphabetically.
4. **Edit a Job** — Click the **Edit** button on any job card to update its details.
5. **Delete a Job** — Click the **Delete** button on any job card to remove it.

### Viewing Statistics

1. Click **Stats** in the sidebar to view your personal job statistics.
2. See a breakdown of jobs by status (Pending, Interview, Declined).
3. View monthly application trends via interactive area and bar charts.

### Profile Management

1. Click **Profile** in the sidebar.
2. Update your name, last name, email, and location.
3. Click **Save Changes** to update your profile.

---

## How to Use App for Admin User

### Admin Login

1. Log in with admin credentials: `admin@jobify.com` / `admin123`.
2. You will be redirected to the Dashboard with all standard user features available.

### Admin Dashboard

1. Click **Admin** in the sidebar to access the admin panel.
2. The admin panel displays application-wide statistics:
   - **Total Users** — Number of registered users in the system.
   - **Total Jobs** — Number of all job entries across all users.

### Admin Capabilities

- ✅ All regular user features (add, edit, delete, search, filter jobs)
- ✅ View personal job statistics and monthly trends
- ✅ Access the **Admin Panel** with app-wide stats (total users & jobs)

---

## Prerequisites

Before running this application locally, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

---

## Installation

   ```bash
1. **Clone the repository**
   git clone https://github.com/tauseefiqbal/jobify-mern-jwt-sc-ts 
   cd jobify-mern-jwt-sc-ts
   ```

2. **Install dependencies for both server and client**
   ```bash
   npm run setup-project
   ```
   This installs dependencies for both the root server and the client folder.

   Alternatively, install manually:
   ```bash
   # Install server dependencies
   npm install

   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=5100
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
```

| Variable | Description |
|---|---|
| `NODE_ENV` | Application environment (`development` / `production`) |
| `PORT` | Server port (default: `5100`) |
| `MONGO_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT token generation |
| `JWT_EXPIRES_IN` | JWT token expiration time (e.g., `1d`) |

---

## Running the Application

### Development Mode

Run both client and server concurrently:
```bash
npm run dev
```

This starts:
- Backend server on `http://localhost:5100`
- Frontend dev server on `http://localhost:5173`

**Run server only:**
```bash
npm run server
```

**Run client only:**
```bash
npm run client
```

### Production Build

1. **Build the client:**
   ```bash
   cd client
   npm run build
   cd ..
   ```

2. **Start the server:**
   ```bash
   node server.js
   ```

The production server serves the built React app from the `client/dist` folder.

---

## API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login user | No |
| GET | `/logout` | Logout user | No |

### Job Routes (`/api/v1/jobs`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| GET | `/` | Get all jobs (paginated, searchable, filterable) | Yes |
| POST | `/` | Create a new job | Yes |
| GET | `/stats` | Get job statistics & monthly trends | Yes |
| GET | `/:id` | Get a single job by ID | Yes |
| PATCH | `/:id` | Update a job | Yes |
| DELETE | `/:id` | Delete a job | Yes |

### User Routes (`/api/v1/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| GET | `/current-user` | Get current logged-in user info | Yes |
| PATCH | `/update-user` | Update user profile | Yes |
| GET | `/admin/app-stats` | Get app-wide statistics | Yes (Admin) |

---

## Project Structure

```
jobify/
├── client/                  # Frontend React application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── assets/         # Images, CSS, styled-component wrappers
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions (customFetch, links)
│   │   ├── App.jsx         # Root component with routing
│   │   ├── index.css       # Global styles
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── controllers/            # Route controllers
│   ├── authController.js   # Register, login, logout
│   ├── jobController.js    # CRUD operations, stats
│   └── userController.js   # Profile, admin stats
├── errors/                 # Custom error classes
│   └── customErrors.js
├── middleware/             # Express middleware
│   ├── authMiddleware.js   # JWT auth, role check, test user guard
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
│   ├── constants.js        # Enums (job status, type, sort)
│   ├── passwordUtils.js    # Hash & compare passwords
│   └── tokenUtils.js       # Create & verify JWT
├── .env                    # Environment variables (create this)
├── mockData.json           # 100 sample jobs for seeding
├── populate.js             # Database seeding script
├── package.json
└── server.js               # Express server entry point
```

---

## Database Models

### User Model

```javascript
{
  name: String,
  email: String,
  password: String (hashed with bcryptjs),
  lastName: String (default: "lastName"),
  location: String (default: "my city"),
  role: String (enum: "user" | "admin", default: "user")
}
```

### Job Model

```javascript
{
  company: String,
  position: String,
  jobStatus: String (enum: "pending" | "interview" | "declined"),
  jobType: String (enum: "full-time" | "part-time" | "internship"),
  jobLocation: String (default: "my city"),
  createdBy: ObjectId (ref: "User"),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Support

For support, please open an issue in the repository.

---

