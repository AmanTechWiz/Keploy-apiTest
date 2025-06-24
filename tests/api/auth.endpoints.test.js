const request = require('supertest');
const express = require('express');
const { setupTestDB, teardownTestDB, clearDatabase } = require('../../test-setup');
const { UserModel } = require('../../db');
const bcrypt = require('bcrypt');
const z = require('zod');

// Create express app for testing
const app = express();
app.use(express.json());

// Signup endpoint
app.post('/signup', async function(req, res) {
    const required = z.object({
        username: z.string().min(3).email(),
        password: z.string().min(6),
        name: z.string().min(1)
    });
    
    const parseddata = required.safeParse(req.body);

    if (!parseddata.success) {
        res.status(400).json({
            message: "invalid input",
            error: parseddata.error
        });
        return;
    }

    const { username, password, name } = req.body;

    try {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            res.status(400).json({
                message: "User already exists"
            });
            return;
        }

        const HashedPassword = await bcrypt.hash(password, 5);

        await UserModel.create({
            username,
            password: HashedPassword,
            name
        });
        
        res.status(201).json({
            message: "you are signed up successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Login endpoint
app.post("/login", async function(req, res) {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            res.status(404).json({
                message: "User does not exist"
            });
            return;
        }
        
        const passmatch = await bcrypt.compare(password, user.password);

        if (passmatch && user) {
            const JWT = require('jsonwebtoken');
            const token = JWT.sign({ userid: user._id.toString() }, 'random');
            res.json({
                message: "you are logged in successfully",
                token: token
            });
        } else {
            res.status(401).json({
                message: "invalid credentials"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

describe('API Tests - Authentication Endpoints', () => {
    beforeAll(async () => {
        await setupTestDB();
    });

    afterAll(async () => {
        await teardownTestDB();
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    describe('POST /signup', () => {
        test('should create new user with valid data', async () => {
            const userData = {
                username: 'test@example.com',
                password: 'password123',
                name: 'Test User'
            };

            const response = await request(app)
                .post('/signup')
                .send(userData)
                .expect(201);

            expect(response.body.message).toBe('you are signed up successfully');
            
            // Verify user was created in database
            const user = await UserModel.findOne({ username: userData.username });
            expect(user).toBeDefined();
            expect(user.name).toBe(userData.name);
        });

        test('should fail with invalid email', async () => {
            const userData = {
                username: 'notanemail',
                password: 'password123',
                name: 'Test User'
            };

            const response = await request(app)
                .post('/signup')
                .send(userData)
                .expect(400);

            expect(response.body.message).toBe('invalid input');
            expect(response.body.error).toBeDefined();
        });

        test('should fail with short password', async () => {
            const userData = {
                username: 'test@example.com',
                password: '123',
                name: 'Test User'
            };

            const response = await request(app)
                .post('/signup')
                .send(userData)
                .expect(400);

            expect(response.body.message).toBe('invalid input');
        });

        test('should fail with empty name', async () => {
            const userData = {
                username: 'test@example.com',
                password: 'password123',
                name: ''
            };

            const response = await request(app)
                .post('/signup')
                .send(userData)
                .expect(400);

            expect(response.body.message).toBe('invalid input');
        });

        test('should fail with duplicate username', async () => {
            const userData = {
                username: 'test@example.com',
                password: 'password123',
                name: 'Test User'
            };

            // Create user first time
            await request(app)
                .post('/signup')
                .send(userData)
                .expect(201);

            // Try to create same user again
            const response = await request(app)
                .post('/signup')
                .send(userData)
                .expect(400);

            expect(response.body.message).toBe('User already exists');
        });

        test('should fail with missing fields', async () => {
            const userData = {
                username: 'test@example.com'
                // missing password and name
            };

            const response = await request(app)
                .post('/signup')
                .send(userData)
                .expect(400);

            expect(response.body.message).toBe('invalid input');
        });
    });

    describe('POST /login', () => {
        beforeEach(async () => {
            // Create test user
            await request(app)
                .post('/signup')
                .send({
                    username: 'test@example.com',
                    password: 'password123',
                    name: 'Test User'
                });
        });

        test('should login with valid credentials', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: 'test@example.com',
                    password: 'password123'
                })
                .expect(200);

            expect(response.body.message).toBe('you are logged in successfully');
            expect(response.body.token).toBeDefined();
            expect(typeof response.body.token).toBe('string');
        });

        test('should fail with invalid password', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: 'test@example.com',
                    password: 'wrongpassword'
                })
                .expect(401);

            expect(response.body.message).toBe('invalid credentials');
            expect(response.body.token).toBeUndefined();
        });

        test('should fail with non-existent user', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: 'nonexistent@example.com',
                    password: 'password123'
                })
                .expect(404);

            expect(response.body.message).toBe('User does not exist');
            expect(response.body.token).toBeUndefined();
        });

        test('should fail with missing username', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    password: 'password123'
                })
                .expect(404);

            expect(response.body.message).toBe('User does not exist');
        });

        test('should fail with missing password', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: 'test@example.com'
                })
                .expect(401);

            expect(response.body.message).toBe('invalid credentials');
        });
    });
}); 