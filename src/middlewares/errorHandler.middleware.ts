import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Error handler dipanggil:', err);

  if (err.statusCode === 400 && err.validationErrors) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.validationErrors,
    });
  }

  if (err.name === 'ZodError') {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.issues.map((e: any) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  console.error('Unhandled error:', err);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Server error',
  });
};