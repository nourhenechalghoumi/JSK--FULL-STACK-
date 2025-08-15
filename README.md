# JSK Esports Management Platform

A full-stack esports management website built with React, Node.js, and PostgreSQL, featuring both public client pages and a secure admin dashboard.

## 🚀 Features

### Client Website (Public)
- **Home**: Hero section, featured teams, latest events
- **Teams**: Professional team profiles with member information
- **Events**: Upcoming and past tournaments/competitions
- **About**: Organization history and mission
- **Staff**: Team staff profiles and information
- **Leadership**: Leadership team profiles
- **Sponsors**: Sponsor logos and partnerships
- **Hiring**: Job application form with CV upload
- **Contact**: Contact form for inquiries

### Admin Dashboard (Secure)
- **Role-based Authentication**: Admin, Manager, User roles
- **Team Management**: CRUD operations for teams
- **Event Management**: CRUD operations for events
- **Staff Management**: CRUD operations for staff
- **Leadership Management**: CRUD operations for leadership
- **Sponsor Management**: CRUD operations for sponsors
- **Application Management**: View and manage job applications
- **Message Management**: View and manage contact messages

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, TailwindCSS, React Router
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: PostgreSQL (production) / SQLite (development)
- **File Upload**: Multer for CV/image uploads
- **Password Hashing**: bcryptjs
- **Form Handling**: React Hook Form
- **Deployment**: Docker & Docker Compose

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional, for containerized deployment)

## 🚀 Quick Start

### Development Setup

1. **Clone and Install Dependencies**
```bash
npm install
```

2. **Start the Backend Server**
```bash
# In one terminal
cd server && node server.js
```

3. **Start the Frontend Development Server**
```bash
# In another terminal
npm run dev
```

4. **Access the Application**
- Client Website: `http://localhost:5173`
- API Server: `http://localhost:5000`

### Docker Deployment

```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d
```

## 🔐 Default Admin Credentials

- **Email**: admin@esports.com
- **Password**: admin123

## 📁 Project Structure

```
├── src/                          # Frontend React app
│   ├── pages/client/            # Public client pages
│   ├── pages/admin/             # Admin dashboard pages (to be added)
│   ├── components/shared/       # Shared components
│   ├── contexts/                # React contexts
│   └── utils/                   # Utility functions
├── server/                      # Backend Node.js app
│   ├── controllers/             # Route controllers
│   ├── database/                # Database setup and models
│   ├── middleware/              # Express middleware
│   ├── routes/                  # API routes
│   └── uploads/                 # File upload directory
├── docker-compose.yml           # Docker services configuration
└── Dockerfile.*                 # Docker build files
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/verify` - Verify JWT token

### Public Endpoints
- `GET /api/teams` - Get all teams
- `GET /api/events` - Get all events
- `GET /api/sponsors` - Get all sponsors
- `GET /api/staff` - Get all staff
- `GET /api/leadership` - Get all leadership
- `POST /api/applications` - Submit job application
- `POST /api/contact` - Send contact message

### Protected Endpoints (Admin/Manager)
- CRUD operations for all entities
- Application and message management
- User role-based access control

## 🎨 Design Features

- **Modern UI**: Clean, professional design with gaming aesthetics
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Gaming-inspired color scheme
- **Smooth Animations**: Hover states and micro-interactions
- **File Upload**: CV/resume upload with validation
- **Form Validation**: Client and server-side validation

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- File upload validation
- CORS protection
- Input sanitization

## 🚀 Deployment Options

### Local Development
- Frontend: `npm run dev` (Vite dev server)
- Backend: `node server/server.js`

### Docker Production
- Complete containerized setup
- Multi-service architecture
- Volume persistence for uploads and database

### Environment Variables

Create a `.env` file in the root directory:

```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=5000
NODE_ENV=development
```

## 📝 License

This project is licensed under the MIT License.



