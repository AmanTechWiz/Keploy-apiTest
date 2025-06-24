const z = require('zod');

// Mock the validation schema from index.js
const signupSchema = z.object({
    username: z.string().min(3).email(),
    password: z.string().min(6),
    name: z.string().min(1)
});

describe('Unit Tests - Input Validation', () => {
    describe('Signup Validation', () => {
        test('should validate correct signup data', () => {
            const validData = {
                username: 'test@example.com',
                password: 'password123',
                name: 'Test User'
            };

            const result = signupSchema.safeParse(validData);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(validData);
        });

        test('should fail with invalid email', () => {
            const invalidData = {
                username: 'notanemail',
                password: 'password123',
                name: 'Test User'
            };

            const result = signupSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            expect(result.error).toBeDefined();
        });

        test('should fail with short username', () => {
            const invalidData = {
                username: 'a@',
                password: 'password123',
                name: 'Test User'
            };

            const result = signupSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        test('should fail with short password', () => {
            const invalidData = {
                username: 'test@example.com',
                password: '123',
                name: 'Test User'
            };

            const result = signupSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        test('should fail with empty name', () => {
            const invalidData = {
                username: 'test@example.com',
                password: 'password123',
                name: ''
            };

            const result = signupSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        test('should fail with missing fields', () => {
            const invalidData = {
                username: 'test@example.com'
                // missing password and name
            };

            const result = signupSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });

    describe('Todo Title Validation', () => {
        // Helper function to validate title (matches the logic in index.js)
        const isValidTitle = (title) => {
            return !!(title && title.trim() !== "");
        };

        test('should validate non-empty title', () => {
            const title = 'Buy groceries';
            expect(isValidTitle(title)).toBe(true);
        });

        test('should fail with empty title', () => {
            const title = '';
            expect(isValidTitle(title)).toBe(false);
        });

        test('should fail with whitespace-only title', () => {
            const title = '   ';
            expect(isValidTitle(title)).toBe(false);
        });

        test('should fail with null title', () => {
            const title = null;
            expect(isValidTitle(title)).toBe(false);
        });

        test('should fail with undefined title', () => {
            const title = undefined;
            expect(isValidTitle(title)).toBe(false);
        });
    });
}); 