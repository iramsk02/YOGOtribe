"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cors from "cors"
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000');
// Middleware to parse JSON
app.use(express_1.default.json());
// app.use(cors())
// Function to check if a number is prime
function isPrime(num) {
    // Handle edge cases
    if (num <= 1)
        return false;
    if (num <= 3)
        return true;
    if (num % 2 === 0 || num % 3 === 0)
        return false;
    // Check for divisors from 5 to sqrt(num)
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}
// Prime checker endpoint
app.get('/prime/:number', (req, res) => {
    try {
        console.log("hello");
        const number = parseInt(req.params.number);
        // Validate input
        if (isNaN(number)) {
            const errorResponse = {
                error: 'Invalid input. Please provide a valid number.',
                example: '/prime/17'
            };
            res.status(400).json(errorResponse);
            return;
        }
        // Check if number is too large (optional safety check)
        if (number > Number.MAX_SAFE_INTEGER) {
            const errorResponse = {
                error: 'Number too large. Please provide a smaller number.',
                maxSafeInteger: Number.MAX_SAFE_INTEGER
            };
            res.status(400).json(errorResponse);
            return;
        }
        const result = isPrime(number);
        const response = {
            number: number,
            isPrime: result,
            message: `${number} is ${result ? '' : 'not '}a prime number`
        };
        res.json(response);
    }
    catch (error) {
        const errorResponse = {
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        };
        res.status(500).json(errorResponse);
    }
});
// Health check endpoint
app.get('/', (req, res) => {
    const response = {
        message: 'Prime Number Checker API',
        usage: 'GET /prime/{number}',
        example: '/prime/17'
    };
    res.json(response);
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    const errorResponse = {
        error: 'Something went wrong!',
        message: err.message
    };
    res.status(500).json(errorResponse);
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Test the API: http://localhost:${PORT}/prime/17`);
});
exports.default = app;
