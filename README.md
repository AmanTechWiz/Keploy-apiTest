![image](https://github.com/user-attachments/assets/c3ba767c-10e3-450c-a4a1-bfafb47ca555)# Todo API with Comprehensive Testing

A RESTful Todo API with JWT authentication, built with Node.js and MongoDB. Features complete unit, integration, and API tests with 70%+ code coverage.

## 🚀 API Overview

**Todo Management API** with user authentication and CRUD operations:

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/signup` | User registration | No |
| `POST` | `/login` | User authentication | No |
| `POST` | `/todo` | Create new todo | Yes |
| `GET` | `/todos` | Get all user todos | Yes |
| `GET` | `/todo/:id` | Get specific todo | Yes |
| `PUT` | `/todo/:id` | Update todo | Yes |
| `DELETE` | `/todo/:id` | Delete todo | Yes |

## 🛠 Tech Stack

**Backend:**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Zod** - Input validation

**Testing:**
- **Jest** - Testing framework
- **Supertest** - HTTP assertions
- **MongoDB Memory Server** - In-memory database for tests

## 🏃‍♂️ How to Run

### Start the Application
```bash
# Install dependencies
npm install

# Start the server
node index.js

# Server runs on http://localhost:3000
```

### Run Tests
```bash
# Run all tests with coverage
npm run test:coverage

# Run individual test types
npm run test:unit        # Unit tests
npm run test:integration # Database tests  
npm run test:api        # Endpoint tests

# Run comprehensive test suite
node run-tests.js
```

## 🧪 Testing Strategy

**3-Layer Testing Approach:**

1. **Unit Tests** (`tests/unit/`) - Test individual functions
   - JWT token operations
   - Password hashing
   - Input validation

2. **Integration Tests** (`tests/integration/`) - Test database operations
   - User CRUD operations
   - Todo CRUD operations
   - Data relationships

3. **API Tests** (`tests/api/`) - Test HTTP endpoints
   - Authentication endpoints
   - Todo management endpoints
   - Error handling

**Coverage Target:** 70%+ across statements, branches, functions, and lines

## 📊 Testing Frameworks & Tools

- **Jest** - Main testing framework with coverage reporting
- **Supertest** - HTTP request testing for Express apps
- **MongoDB Memory Server** - Isolated in-memory MongoDB for tests
- **Istanbul** - Code coverage analysis
- **bcrypt** - Password hashing testing
- **jsonwebtoken** - JWT token testing

## 🔧 Quick Example

```bash
# Register a user
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"test@example.com","password":"password123","name":"Test User"}'

# Login to get token
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test@example.com","password":"password123"}'

# Create a todo (use token from login)
curl -X POST http://localhost:3000/todo \
  -H "Content-Type: application/json" \
  -H "token: YOUR_JWT_TOKEN" \
  -d '{"title":"My first todo"}'
```

## 📈 Test Coverage

After running tests, view coverage report:
- Open `coverage/lcov-report/index.html` in browser
- Or check console output for coverage summary

---
## ScreenShots

![image](https://github.com/user-attachments/assets/4cbebf07-f931-4988-a12d-fdb71341558e)

![image](https://github.com/user-attachments/assets/9fe0cef0-1f95-4eaa-8330-6845517c9ff5)

![image](https://github.com/user-attachments/assets/5b44e4a6-c2d8-4616-98eb-72937ac21636)


