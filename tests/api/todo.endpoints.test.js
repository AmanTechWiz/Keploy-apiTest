const request = require('supertest');
const express = require('express');
const JWT = require('jsonwebtoken');
const { setupTestDB, teardownTestDB, clearDatabase } = require('../../test-setup');
const { UserModel, TodoModel } = require('../../db');

const JWT_SECRET = 'random';

// Create express app for testing
const app = express();
app.use(express.json());

// Auth middleware
function auth(req, res, next) {
    const token = req.headers.token;
    
    try {
        const decoded = JWT.verify(token, JWT_SECRET);
        
        if (decoded) {
            req.userid = decoded.userid;
            next();
        } else {
            res.status(401).json({
                message: "invalid token"
            });
        }
    } catch (error) {
        res.status(401).json({
            message: "invalid token"
        });
    }
}

// Create Todo
app.post("/todo", auth, async function(req, res) {
    const title = req.body.title;

    if (!title || title.trim() === "") {
        res.status(400).json({
            message: "Title is required"
        });
        return;
    }

    try {
        await TodoModel.create({
            title: title,
            done: false,
            userId: req.userid
        });

        res.status(201).json({
            message: "todo created"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Get all todos
app.get("/todos", auth, async function(req, res) {
    try {
        const todos = await TodoModel.find({ userId: req.userid });
        res.json(todos);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Get single todo by ID
app.get("/todo/:id", auth, async function(req, res) {
    const todoId = req.params.id;
    
    try {
        const todo = await TodoModel.findOne({ _id: todoId, userId: req.userid });
        
        if (!todo) {
            res.status(404).json({
                message: "Todo not found"
            });
            return;
        }
        
        res.json(todo);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Update todo
app.put("/todo/:id", auth, async function(req, res) {
    const todoId = req.params.id;
    const { title, done } = req.body;
    
    try {
        const todo = await TodoModel.findOne({ _id: todoId, userId: req.userid });
        
        if (!todo) {
            res.status(404).json({
                message: "Todo not found"
            });
            return;
        }
        
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (done !== undefined) updateData.done = done;
        
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            todoId, 
            updateData, 
            { new: true }
        );
        
        res.json({
            message: "todo updated successfully",
            todo: updatedTodo
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Delete todo
app.delete("/todo/:id", auth, async function(req, res) {
    const todoId = req.params.id;
    
    try {
        const todo = await TodoModel.findOne({ _id: todoId, userId: req.userid });
        
        if (!todo) {
            res.status(404).json({
                message: "Todo not found"
            });
            return;
        }
        
        await TodoModel.findByIdAndDelete(todoId);
        
        res.json({
            message: "todo deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

describe('API Tests - Todo Endpoints', () => {
    let authToken;
    let userId;

    beforeAll(async () => {
        await setupTestDB();
    });

    afterAll(async () => {
        await teardownTestDB();
    });

    beforeEach(async () => {
        await clearDatabase();
        
        // Create test user and get token
        const userData = {
            username: 'test@example.com',
            password: 'password123',
            name: 'Test User'
        };

        const user = await UserModel.create({
            username: userData.username,
            password: userData.password,
            name: userData.name
        });

        userId = user._id.toString();
        authToken = JWT.sign({ userid: userId }, JWT_SECRET);
    });

    describe('POST /todo', () => {
        test('should create todo with valid data', async () => {
            const response = await request(app)
                .post('/todo')
                .set('token', authToken)
                .send({ title: 'Test Todo' })
                .expect(201);

            expect(response.body.message).toBe('todo created');
            
            // Verify todo was created in database
            const todo = await TodoModel.findOne({ userId: userId });
            expect(todo).toBeDefined();
            expect(todo.title).toBe('Test Todo');
            expect(todo.done).toBe(false);
        });

        test('should fail without authentication', async () => {
            const response = await request(app)
                .post('/todo')
                .send({ title: 'Test Todo' })
                .expect(401);

            expect(response.body.message).toBe('invalid token');
        });

        test('should fail with empty title', async () => {
            const response = await request(app)
                .post('/todo')
                .set('token', authToken)
                .send({ title: '' })
                .expect(400);

            expect(response.body.message).toBe('Title is required');
        });
    });

    describe('GET /todos', () => {
        test('should get all todos for authenticated user', async () => {
            // Create some todos
            await TodoModel.create({
                title: 'Todo 1',
                done: false,
                userId: userId
            });

            await TodoModel.create({
                title: 'Todo 2',
                done: true,
                userId: userId
            });

            const response = await request(app)
                .get('/todos')
                .set('token', authToken)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toHaveLength(2);
        });

        test('should fail without authentication', async () => {
            const response = await request(app)
                .get('/todos')
                .expect(401);

            expect(response.body.message).toBe('invalid token');
        });
    });

    describe('PUT /todo/:id', () => {
        let todoId;

        beforeEach(async () => {
            const todo = await TodoModel.create({
                title: 'Test Todo',
                done: false,
                userId: userId
            });
            todoId = todo._id.toString();
        });

        test('should update todo', async () => {
            const response = await request(app)
                .put(`/todo/${todoId}`)
                .set('token', authToken)
                .send({ title: 'Updated Todo', done: true })
                .expect(200);

            expect(response.body.message).toBe('todo updated successfully');
            expect(response.body.todo.title).toBe('Updated Todo');
            expect(response.body.todo.done).toBe(true);
        });
    });

    describe('DELETE /todo/:id', () => {
        let todoId;

        beforeEach(async () => {
            const todo = await TodoModel.create({
                title: 'Test Todo',
                done: false,
                userId: userId
            });
            todoId = todo._id.toString();
        });

        test('should delete todo', async () => {
            const response = await request(app)
                .delete(`/todo/${todoId}`)
                .set('token', authToken)
                .expect(200);

            expect(response.body.message).toBe('todo deleted successfully');

            // Verify todo was deleted
            const deletedTodo = await TodoModel.findById(todoId);
            expect(deletedTodo).toBeNull();
        });
    });
}); 