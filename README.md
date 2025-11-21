# Criminal Management System (CMS)

A comprehensive full-stack web application for police departments to efficiently manage criminal records.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: JWT with bcryptjs
- **HTTP Client**: Axios

## Project Structure

\`\`\`
/root
├── /server              # Backend (Express.js)
│   ├── /config         # Database configuration
│   ├── /controllers    # Business logic
│   ├── /middleware     # JWT authentication
│   ├── /models         # Mongoose schemas
│   ├── /routes         # API endpoints
│   └── server.js       # Express server
├── /client             # Frontend (React)
│   └── /src
│       ├── /components # Reusable components
│       ├── /context    # Auth state management
│       ├── /pages      # Page components
│       └── main.jsx    # Entry point
└── .env               # Environment variables
\`\`\`

## Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Configure `.env` file:
\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/criminal_db
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secure_jwt_secret_key
\`\`\`

3. Start development server:
\`\`\`bash
npm run dev
\`\`\`

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client:
\`\`\`bash
cd client
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start development server:
\`\`\`bash
npm run dev
\`\`\`

Frontend will run on `http://localhost:3000`

## Features

- **User Authentication**: Secure JWT-based login with password hashing
- **Dashboard**: Real-time statistics and criminal records overview
- **Search & Filter**: Search by name, filter by status
- **Record Management**: Full CRUD operations with validation
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Comprehensive error messages and edge case handling

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Criminal Records (Protected Routes)
- `GET /api/criminals` - Get all criminals (with optional search)
- `GET /api/criminals/:id` - Get single criminal
- `POST /api/criminals` - Create new record
- `PUT /api/criminals/:id` - Update record
- `DELETE /api/criminals/:id` - Delete record

## Demo Credentials

- **Username**: officer1
- **Password**: password123

## Deployment

### Backend Deployment
Deploy to: Heroku, Railway, Render, or AWS with MongoDB Atlas

### Frontend Deployment
Deploy to: Vercel, Netlify, or any static hosting service

Build frontend:
\`\`\`bash
cd client
npm run build
\`\`\`

## License

This project is open source and available under the MIT License.
