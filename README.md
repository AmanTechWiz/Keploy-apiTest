# 📝 Keploy Todo API

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)


**Made with ❤️ for the Keploy community**

# Keploy Todo API with Comprehensive Testing Suite

A robust RESTful API for todo management with user authentication, built with Node.js, Express, and MongoDB. This project demonstrates a complete testing strategy including unit tests, integration tests, and API tests with **70%+ code coverage**.

## 📚 Table of Contents
- [API Overview](#-api-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Testing Strategy](#-testing-strategy)
- [How to Run Tests](#-how-to-run-tests)
- [Testing Frameworks & Tools](#-testing-frameworks--tools)
- [Code Coverage](#-code-coverage)
- [Security Features](#-security-features)

## 🚀 API Overview

This project implements a **Todo Management API** with the following capabilities:

### **Core API Features:**
- **User Authentication** - JWT-based registration and login
- **Todo Management** - Complete CRUD operations for todos
- **User Isolation** - Each user can only access their own todos
- **Input Validation** - Comprehensive validation using Zod
- **Security** - Password hashing, route protection, and authorization

### **API Endpoints:**
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

### **Backend Framework:**
- **Node.js** - Runtime environment
- **Express.js** - Web framework for building REST API
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - ODM for MongoDB with schema validation

### **Authentication & Security:**
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcrypt** - Password hashing and verification
- **Zod** - Input validation and type checking

### **Testing Stack:**
- **Jest** - Primary testing framework
- **Supertest** - HTTP assertion library for API testing
- **MongoDB Memory Server** - In-memory MongoDB for testing
- **Istanbul/NYC** - Code coverage reporting

### **Development Tools:**
- **npm** - Package manager
- **ESLint** - Code linting (optional)
- **Prettier** - Code formatting (optional)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user authentication with bcrypt password hashing
- 📋 **Complete CRUD Operations** - Create, Read, Update, Delete todos with full REST API
- 👤 **User Management** - User registration, login, and session management
- 🛡️ **Route Protection** - Protected routes with authentication middleware
- ✅ **Input Validation** - Comprehensive validation with Zod schemas
- 🗄️ **MongoDB Integration** - Robust database operations with Mongoose ODM
- 🧪 **Comprehensive Testing** - Unit, Integration, and API tests with 70%+ coverage
- 🔒 **Security Best Practices** - Password hashing, JWT tokens, user data isolation

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd keploy-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB connection**
   
   Update the MongoDB connection in `db.js` (if using local MongoDB):
   ```javascript
   mongoose.connect("mongodb://localhost:27017/keploy-todo");
   ```
   
   Or use MongoDB Atlas:
   ```javascript
   mongoose.connect("mongodb+srv://username:password@cluster.mongodb.net/keploy-todo");
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   node index.js
   ```

5. **Server will be running on** `http://localhost:3000`

### Running the Application
```bash
# Start the server
node index.js

# The API will be available at:
# http://localhost:3000
```

### Quick Test
```bash
# Test server is running
curl http://localhost:3000/signup

# Register a user
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"test@example.com","password":"password123","name":"Test User"}'
```

## 📊 Test Coverage

The test suite aims for **70%+ code coverage** across:
- **Statements**: 70%+
- **Branches**: 70%+ 
- **Functions**: 70%+
- **Lines**: 70%+

Coverage reports are generated in:
- `coverage/lcov-report/index.html` (HTML format)
- `coverage/lcov.info` (LCOV format)

## 🧪 Testing Strategy

This project implements a **comprehensive 3-layer testing approach** to ensure reliability, security, and maintainability:

### **Testing Philosophy:**
- **Unit Tests** - Test individual functions and business logic in isolation
- **Integration Tests** - Test database operations and component interactions  
- **API Tests** - Test complete request/response cycles and endpoint functionality
- **70%+ Code Coverage** - Maintain high coverage across all metrics

## 🔧 Testing Frameworks & Tools

### **Primary Testing Stack:**
- **Jest** - Main testing framework with built-in assertions and mocking
- **Supertest** - HTTP assertion library for testing Express applications
- **MongoDB Memory Server** - In-memory MongoDB instance for isolated testing
- **Istanbul** - Code coverage analysis and reporting

### **Testing Configuration:**
```json
{
  "testEnvironment": "node",
  "maxWorkers": 1,
  "forceExit": true,
  "detectOpenHandles": true,
  "coverageThreshold": {
    "global": {
      "branches": 70,
      "functions": 70,
      "lines": 70,
      "statements": 70
    }
  }
}
```

## 🏃‍♂️ How to Run Tests

### **Quick Start - Run All Tests:**
```bash
# Install dependencies (if not already done)
npm install

# Run comprehensive test suite with detailed reporting
node run-tests.js
```

### **Individual Test Types:**
```bash
# Unit tests only (fastest)
npm run test:unit

# Integration tests only  
npm run test:integration

# API tests only
npm run test:api

# All tests with coverage report
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### **Advanced Testing Commands:**
```bash
# Run specific test file
npx jest tests/unit/auth.test.js

# Run tests matching pattern
npm test -- --testNamePattern="should create user"

# Run with verbose output
npx jest --verbose

# Debug mode
npx jest --detectOpenHandles --forceExit
```

## 📊 Code Coverage

The test suite maintains **70%+ coverage** across all metrics:

### **Coverage Targets:**
- **Statements**: 70%+ 
- **Branches**: 70%+
- **Functions**: 70%+
- **Lines**: 70%+

### **Coverage Reports:**
After running tests, coverage reports are available in:
- `coverage/lcov-report/index.html` - Interactive HTML report
- `coverage/lcov.info` - LCOV format for CI/CD integration
- Console output - Summary metrics

### **Viewing Coverage:**
```bash
# Generate and view coverage
npm run test:coverage

# Open HTML report (Windows)
start coverage/lcov-report/index.html

# Open HTML report (macOS)
open coverage/lcov-report/index.html

# Open HTML report (Linux)
xdg-open coverage/lcov-report/index.html
```

## 🧪 Test Structure & Details

### 1. Unit Tests (`tests/unit/`)
Tests individual functions and logic **without external dependencies**.

**Files:**
- `auth.test.js` - JWT token operations, password hashing, auth middleware
- `validation.test.js` - Input validation using Zod schemas

**Features Tested:**
- ✅ JWT token creation and verification
- ✅ Password hashing and comparison  
- ✅ Authentication middleware logic
- ✅ Input validation for signup data
- ✅ Todo title validation

### 2. Integration Tests (`tests/integration/`)
Tests database operations and model interactions.

**Files:**
- `database.test.js` - User and Todo model CRUD operations

**Features Tested:**
- ✅ User creation and retrieval
- ✅ Duplicate username handling
- ✅ Todo CRUD operations
- ✅ User-todo relationship integrity
- ✅ Data isolation between users

### 3. API Tests (`tests/api/`)
Tests complete endpoint functionality with HTTP requests.

**Files:**
- `auth.endpoints.test.js` - Authentication endpoints
- `todo.endpoints.test.js` - Todo management endpoints

**Features Tested:**

#### Authentication Endpoints:
- ✅ POST `/signup` - User registration
- ✅ POST `/login` - User authentication

#### Todo Endpoints:
- ✅ POST `/todo` - Create new todo
- ✅ GET `/todos` - Get all user todos
- ✅ GET `/todo/:id` - Get specific todo
- ✅ PUT `/todo/:id` - Update todo
- ✅ DELETE `/todo/:id` - Delete todo

## 🛠 Testing Approach

### Mocking vs Non-Mocking

**Non-Mocking (Integration/API Tests):**
- Uses MongoDB Memory Server for real database operations
- Tests actual database interactions
- Validates complete request-response cycles

**Mocking (Unit Tests):**
- Isolates individual functions
- Fast execution
- Tests business logic without dependencies

### Database Testing Strategy

1. **In-Memory MongoDB**: Uses `mongodb-memory-server` for isolated test environment
2. **Clean State**: Database is cleared between each test
3. **Real Operations**: Tests actual CRUD operations
4. **Data Isolation**: Ensures user data separation

## 📋 Test Coverage Details

### Authentication Coverage
- Token generation and validation
- Password hashing security
- Invalid token handling
- Missing authentication scenarios

### Validation Coverage  
- Email format validation
- Password strength requirements
- Required field validation
- Edge cases (empty strings, whitespace)

### API Endpoint Coverage
- Success scenarios (2xx responses)
- Client errors (4xx responses) 
- Authentication failures (401)
- Authorization failures (404 for wrong user)
- Input validation errors (400)

### Database Coverage
- Create operations
- Read operations (single and multiple)
- Update operations
- Delete operations
- Relationship integrity
- Error handling

## 🔧 Test Configuration

### Jest Configuration (`package.json`)
```json
{
  "jest": {
    "testEnvironment": "node",
    "collectCoverageFrom": [
      "*.js",
      "!node_modules/**",
      "!coverage/**"
    ],
    "coverageReporters": ["text", "lcov", "html"],
    "coverageThreshold": {
      "global": {
        "branches": 70,
        "functions": 70, 
        "lines": 70,
        "statements": 70
      }
    }
  }
}
```

### Test Scripts
- `test` - Run all tests
- `test:watch` - Run tests in watch mode
- `test:coverage` - Run tests with coverage report
- `test:unit` - Run only unit tests
- `test:integration` - Run only integration tests  
- `test:api` - Run only API tests

## 🚦 Running Specific Tests

```bash
# Run tests for specific functionality
npm test -- --testNamePattern="should create user"
npm test -- --testPathPattern="auth"

# Run tests in watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📈 Test Results Interpretation

### Coverage Metrics
- **Statements**: % of executable statements executed
- **Branches**: % of control structures (if/else) tested
- **Functions**: % of functions called
- **Lines**: % of lines executed

### Success Criteria
- ✅ All tests pass
- ✅ Coverage ≥ 70% for all metrics
- ✅ No security vulnerabilities in dependencies
- ✅ Proper error handling tested

## 🔍 Debugging Tests

### Common Issues
1. **MongoDB Connection**: Ensure no MongoDB instance running on default port
2. **Token Expiry**: Tests use consistent JWT secret
3. **Race Conditions**: Tests clean database between runs
4. **Async/Await**: Proper promise handling in tests

### Debug Mode
```bash
# Run specific test file
npx jest tests/unit/auth.test.js

# Run with verbose output
npx jest --verbose

# Run single test
npx jest --testNamePattern="should create user"
```

## 🛡 Security Testing

Tests include security scenarios:
- Invalid token handling
- Authorization bypass attempts
- Input sanitization
- Password security
- User data isolation

## 📊 Performance Considerations

- In-memory database for fast test execution
- Parallel test execution where possible
- Optimized test setup and teardown
- Minimal test dependencies

## 🎯 Best Practices Implemented

1. **Arrange-Act-Assert** pattern
2. **Descriptive test names**
3. **Independent tests** (no shared state)
4. **Comprehensive error scenarios**
5. **Real-world data patterns**
6. **Security boundary testing**

---

## 🛡 Security Features

This API implements multiple security layers:

### **Authentication Security:**
- **JWT Tokens** - Stateless authentication with secure token generation
- **Password Hashing** - bcrypt with salt rounds for secure password storage
- **Route Protection** - Middleware-based authentication for sensitive endpoints

### **Input Security:**
- **Validation** - Zod schemas prevent malformed data
- **Sanitization** - Input cleaning and type checking
- **Error Handling** - Secure error messages without data exposure

### **Data Security:**
- **User Isolation** - Users can only access their own data
- **Database Security** - Mongoose schema validation and constraints
- **Authorization** - Proper user ownership verification

## 🔄 Database Schema

### **User Collection (`users`):**
```javascript
{
  username: String (unique, email format),
  password: String (bcrypt hashed),
  name: String,
  _id: ObjectId
}
```

### **Todo Collection (`todo-collection`):**
```javascript
{
  title: String,
  done: Boolean,
  userId: ObjectId (references User),
  _id: ObjectId
}
```

## 🚀 Deployment & Production

### **Environment Variables:**
```bash
# Create .env file
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/keploy-todo
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
```

### **Production Considerations:**
- Use environment variables for sensitive data
- Implement rate limiting
- Add request logging
- Set up monitoring and health checks
- Use HTTPS in production
- Implement proper CORS configuration

## 📈 Test Results Example

```bash
🚀 Starting comprehensive test suite for Keploy API

🧪 Test Execution Plan:
1. Unit Tests (Authentication & Validation)
2. Integration Tests (Database Operations)
3. API Tests (Endpoint Functionality)
4. Coverage Report Generation

🔍 Running Unit Tests...
✅ Completed successfully

🔗 Running Integration Tests...
✅ Completed successfully

🌐 Running API Tests...
✅ Completed successfully

📊 Generating Coverage Report...
✅ Completed successfully

🎯 Coverage Analysis:
   Statements: 85.2%
   Branches: 78.4%
   Functions: 82.1%
   Lines: 85.2%

🏆 Excellent! All coverage metrics exceed 70% threshold

✨ All tests completed successfully!

🎉 Test Summary:
   ✅ Unit Tests: Passed (19 tests)
   ✅ Integration Tests: Passed (12 tests)
   ✅ API Tests: Passed (24 tests)
   ✅ Coverage Report: Generated
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Run tests** (`npm run test:coverage`)
4. **Commit changes** (`git commit -m 'Add amazing feature'`)
5. **Push to branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### **Development Guidelines:**
- Maintain 70%+ test coverage
- Write tests for new features
- Follow existing code style
- Update documentation as needed

## 📞 Support & Documentation

- **Issues**: Report bugs and request features via GitHub Issues
- **API Documentation**: See inline documentation and examples above
- **Testing Guide**: Comprehensive testing examples in `/tests` directory
- **Code Coverage**: View detailed reports in `/coverage` directory

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the Keploy community**

*This project demonstrates production-ready API development with comprehensive testing, security best practices, and maintainable code architecture.* 