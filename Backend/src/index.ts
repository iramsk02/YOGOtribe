import express, { Request, Response, NextFunction } from 'express';
// import cors from "cors"

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000');

// Interface for API responses
interface PrimeResponse {
  number: number;
  isPrime: boolean;
  message: string;
}

interface ErrorResponse {
  error: string;
  message?: string;
  example?: string;
  maxSafeInteger?: number;
}

interface HealthCheckResponse {
  message: string;
  usage: string;
  example: string;
}

// Middleware to parse JSON
app.use(express.json());
// app.use(cors())

// Function to check if a number is prime
function isPrime(num: number): boolean {
  // Handle edge cases
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  // Check for divisors from 5 to sqrt(num)
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
  }
  
  return true;
}

// Prime checker endpoint
app.get('/prime/:number', (req: Request, res: Response): void => {
  try {
    const number: number = parseInt(req.params.number);
    
    // Validate input
    if (isNaN(number)) {
      const errorResponse: ErrorResponse = {
        error: 'Invalid input. Please provide a valid number.',
        example: '/prime/17'
      };
      res.status(400).json(errorResponse);
      return;
    }
    
    // Check if number is too large (optional safety check)
    if (number > Number.MAX_SAFE_INTEGER) {
      const errorResponse: ErrorResponse = {
        error: 'Number too large. Please provide a smaller number.',
        maxSafeInteger: Number.MAX_SAFE_INTEGER
      };
      res.status(400).json(errorResponse);
      return;
    }
    
    const result: boolean = isPrime(number);
    
    const response: PrimeResponse = {
      number: number,
      isPrime: result,
      message: `${number} is ${result ? '' : 'not '}a prime number`
    };
    
    res.json(response);
    
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(errorResponse);
  }
});

// Health check endpoint
app.get('/', (req: Request, res: Response): void => {
  const response: HealthCheckResponse = {
    message: 'Prime Number Checker API',
    usage: 'GET /prime/{number}',
    example: '/prime/17'
  };
  res.json(response);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  const errorResponse: ErrorResponse = {
    error: 'Something went wrong!',
    message: err.message
  };
  res.status(500).json(errorResponse);
});

// Start server
app.listen(PORT, (): void => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test the API: http://localhost:${PORT}/prime/17`);
});

export default app;