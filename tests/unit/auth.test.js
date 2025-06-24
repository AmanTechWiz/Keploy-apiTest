const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Mock the auth middleware from index.js
const JWT_SECRET = 'random';

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

describe('Unit Tests - Authentication', () => {
    describe('JWT Token Operations', () => {
        test('should create a valid JWT token', () => {
            const userId = '507f1f77bcf86cd799439011';
            const token = JWT.sign({ userid: userId }, JWT_SECRET);
            
            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
            
            // Verify the token can be decoded
            const decoded = JWT.verify(token, JWT_SECRET);
            expect(decoded.userid).toBe(userId);
        });

        test('should fail with invalid JWT token', () => {
            const invalidToken = 'invalid.token.here';
            
            expect(() => {
                JWT.verify(invalidToken, JWT_SECRET);
            }).toThrow();
        });

        test('should fail with wrong secret', () => {
            const userId = '507f1f77bcf86cd799439011';
            const token = JWT.sign({ userid: userId }, 'wrong-secret');
            
            expect(() => {
                JWT.verify(token, JWT_SECRET);
            }).toThrow();
        });
    });

    describe('Password Hashing', () => {
        test('should hash password correctly', async () => {
            const password = 'testpassword123';
            const hashedPassword = await bcrypt.hash(password, 5);
            
            expect(hashedPassword).toBeDefined();
            expect(hashedPassword).not.toBe(password);
            expect(hashedPassword.length).toBeGreaterThan(password.length);
        });

        test('should verify password correctly', async () => {
            const password = 'testpassword123';
            const hashedPassword = await bcrypt.hash(password, 5);
            
            const isMatch = await bcrypt.compare(password, hashedPassword);
            expect(isMatch).toBe(true);
            
            const isWrongMatch = await bcrypt.compare('wrongpassword', hashedPassword);
            expect(isWrongMatch).toBe(false);
        });
    });

    describe('Auth Middleware', () => {
        let req, res, next;

        beforeEach(() => {
            req = {
                headers: {}
            };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            next = jest.fn();
        });

        test('should authenticate with valid token', () => {
            const userId = '507f1f77bcf86cd799439011';
            const token = JWT.sign({ userid: userId }, JWT_SECRET);
            req.headers.token = token;

            auth(req, res, next);

            expect(req.userid).toBe(userId);
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        test('should reject invalid token', () => {
            req.headers.token = 'invalid.token';

            auth(req, res, next);

            expect(req.userid).toBeUndefined();
            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: "invalid token"
            });
        });

        test('should reject missing token', () => {
            auth(req, res, next);

            expect(req.userid).toBeUndefined();
            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: "invalid token"
            });
        });
    });
}); 