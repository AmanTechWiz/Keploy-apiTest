const { setupTestDB, teardownTestDB, clearDatabase } = require('../../test-setup');
const { UserModel, TodoModel } = require('../../db');
const bcrypt = require('bcrypt');

describe('Integration Tests - Database Operations', () => {
    beforeAll(async () => {
        await setupTestDB();
    });

    afterAll(async () => {
        await teardownTestDB();
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    describe('User Model Operations', () => {
        test('should create a new user', async () => {
            const userData = {
                username: 'test@example.com',
                password: await bcrypt.hash('password123', 5),
                name: 'Test User'
            };

            const user = await UserModel.create(userData);

            expect(user).toBeDefined();
            expect(user.username).toBe(userData.username);
            expect(user.name).toBe(userData.name);
            expect(user._id).toBeDefined();
        });

        test('should find user by username', async () => {
            const userData = {
                username: 'test@example.com',
                password: await bcrypt.hash('password123', 5),
                name: 'Test User'
            };

            await UserModel.create(userData);
            const foundUser = await UserModel.findOne({ username: userData.username });

            expect(foundUser).toBeDefined();
            expect(foundUser.username).toBe(userData.username);
            expect(foundUser.name).toBe(userData.name);
        });

        test('should not create user with duplicate username', async () => {
            const userData = {
                username: 'test@example.com',
                password: await bcrypt.hash('password123', 5),
                name: 'Test User'
            };

            await UserModel.create(userData);

            // Try to create another user with same username
            await expect(UserModel.create(userData)).rejects.toThrow();
        });

        test('should return null for non-existent user', async () => {
            const foundUser = await UserModel.findOne({ username: 'nonexistent@example.com' });
            expect(foundUser).toBeNull();
        });
    });

    describe('Todo Model Operations', () => {
        let testUserId;

        beforeEach(async () => {
            // Create a test user for todo operations
            const user = await UserModel.create({
                username: 'test@example.com',
                password: await bcrypt.hash('password123', 5),
                name: 'Test User'
            });
            testUserId = user._id;
        });

        test('should create a new todo', async () => {
            const todoData = {
                title: 'Test Todo',
                done: false,
                userId: testUserId
            };

            const todo = await TodoModel.create(todoData);

            expect(todo).toBeDefined();
            expect(todo.title).toBe(todoData.title);
            expect(todo.done).toBe(false);
            expect(todo.userId.toString()).toBe(testUserId.toString());
        });

        test('should find todos by userId', async () => {
            const todoData = [
                { title: 'Todo 1', done: false, userId: testUserId },
                { title: 'Todo 2', done: true, userId: testUserId }
            ];

            await TodoModel.create(todoData[0]);
            await TodoModel.create(todoData[1]);

            const todos = await TodoModel.find({ userId: testUserId });

            expect(todos).toHaveLength(2);
            expect(todos[0].title).toBe('Todo 1');
            expect(todos[1].title).toBe('Todo 2');
        });

        test('should find specific todo by id and userId', async () => {
            const todo = await TodoModel.create({
                title: 'Test Todo',
                done: false,
                userId: testUserId
            });

            const foundTodo = await TodoModel.findOne({ 
                _id: todo._id, 
                userId: testUserId 
            });

            expect(foundTodo).toBeDefined();
            expect(foundTodo.title).toBe('Test Todo');
            expect(foundTodo.userId.toString()).toBe(testUserId.toString());
        });

        test('should update todo', async () => {
            const todo = await TodoModel.create({
                title: 'Test Todo',
                done: false,
                userId: testUserId
            });

            const updatedTodo = await TodoModel.findByIdAndUpdate(
                todo._id,
                { title: 'Updated Todo', done: true },
                { new: true }
            );

            expect(updatedTodo.title).toBe('Updated Todo');
            expect(updatedTodo.done).toBe(true);
        });

        test('should delete todo', async () => {
            const todo = await TodoModel.create({
                title: 'Test Todo',
                done: false,
                userId: testUserId
            });

            await TodoModel.findByIdAndDelete(todo._id);

            const foundTodo = await TodoModel.findById(todo._id);
            expect(foundTodo).toBeNull();
        });

        test('should not find todo for different user', async () => {
            // Create another user
            const otherUser = await UserModel.create({
                username: 'other@example.com',
                password: await bcrypt.hash('password123', 5),
                name: 'Other User'
            });

            // Create todo for first user
            const todo = await TodoModel.create({
                title: 'Test Todo',
                done: false,
                userId: testUserId
            });

            // Try to find todo with other user's ID
            const foundTodo = await TodoModel.findOne({ 
                _id: todo._id, 
                userId: otherUser._id 
            });

            expect(foundTodo).toBeNull();
        });
    });
}); 