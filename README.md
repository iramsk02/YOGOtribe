# Yogotribe Full-Stack Challenge

A complete full-stack application consisting of a React frontend for fetching random facts and a TypeScript Node.js backend API for prime number checking.

## 🚀 Project Overview

This project contains two main components:
- **Frontend**: React application that fetches random cat facts from a public API
- **Backend**: TypeScript/Node.js REST API that determines if a number is prime

## 📁 Project Structure

```
yogotribe-challenge/
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   ├── package.json
│   └── README.md
├── backend/
│   ├── src/
│   │   └── server.ts
│   ├── dist/           (generated after build)
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
├── README.md
└── .gitignore
```

## 🛠️ Technologies Used

### Frontend
- React 18
- JavaScript (ES6+)
- Tailwind CSS
- Fetch API with async/await

### Backend
- Node.js
- TypeScript
- Express.js
- RESTful API design

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/yogotribe-challenge.git
cd yogotribe-challenge
```

### 2. Backend Setup

```bash
cd backend
npm install
```

**Development dependencies:**
```bash
npm install --save-dev typescript @types/node @types/express ts-node nodemon
```

**Production dependencies:**
```bash
npm install express
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## 🚀 Running the Application

### Backend (API Server)

```bash
cd backend

# Development mode (with auto-restart)
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

The API will be available at: `http://localhost:3000`

### Frontend (React App)

```bash
cd frontend

# Development mode
npm start

# Build for production
npm run build
```

The React app will be available at: `http://localhost:5173` (or next available port)

## 📖 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### Health Check
```http
GET /
```

**Response:**
```json
{
  "message": "Prime Number Checker API",
  "usage": "GET /prime/{number}",
  "example": "/prime/17"
}
```

#### Check Prime Number
```http
GET /prime/{number}
```

**Parameters:**
- `number` (path parameter): Integer to check for primality

**Success Response (200):**
```json
{
  "number": 17,
  "isPrime": true,
  "message": "17 is a prime number"
}
```

**Error Response (400):**
```json
{
  "error": "Invalid input. Please provide a valid number.",
  "example": "/prime/17"
}
```

### Example API Calls

```bash
# Check if 17 is prime
curl http://localhost:3000/prime/17

# Check if 20 is prime
curl http://localhost:3000/prime/20



### Frontend Testing

1. Start the backend server
2. Start the frontend application
3. Click "Get Random Fact" button
4. Verify that cat facts are displayed
5. Test error handling by stopping the backend server

## 📚 Features

### Frontend Features
- ✅ Clean, responsive UI with Tailwind CSS
- ✅ Async/await API calls
- ✅ Loading states and error handling
- ✅ Single button interaction
- ✅ Display random cat facts

### Backend Features
- ✅ TypeScript with full type safety
- ✅ RESTful API design
- ✅ Input validation and sanitization
- ✅ Comprehensive error handling
- ✅ Efficient prime number algorithm
- ✅ JSON response format
- ✅ Health check endpoint

## 🔍 Algorithm Details

### Prime Number Checking Algorithm

The backend uses an optimized prime checking algorithm:

1. **Edge Cases**: Numbers ≤ 1 are not prime, 2 and 3 are prime
2. **Even Numbers**: All even numbers > 2 are not prime
3. **Optimization**: Only check odd divisors up to √n

**Time Complexity**: O(√n)
**Space Complexity**: O(1)

## 🚦 Git Workflow

### Initial Setup
```bash
git init
git add .
git commit -m "Initial commit: Full-stack challenge setup"
git branch -M main
git remote add origin https://github.com/yourusername/yogotribe-challenge.git
git push -u origin main
```

### Development Workflow
```bash
# Create feature branch
git checkout -b feature/add-new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature description"

# Push branch
git push origin feature/add-new-feature

# Create pull request (via GitHub)
# After approval, merge to main


## 📦 Available Scripts

### Backend Scripts
```bash
npm run dev        # Start development server with auto-restart
npm run build      # Build TypeScript to JavaScript
npm start          # Start production server
npm run clean      # Remove build artifacts
```

### Frontend Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

## 🌍 Environment Variables

Create `.env` file in backend directory:
```env
PORT=3000
NODE_ENV=development
```

## 📁 .gitignore

```gitignore
# Dependencies
node_modules/
npm-debug.log*

# Production builds
/build
/dist

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs
*.log

# Coverage
coverage/

# TypeScript
*.tsbuildinfo
```
