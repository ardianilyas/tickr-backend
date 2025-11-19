import { Request, Response, NextFunction } from 'express';
import { Prisma } from '../generated/prisma/client';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).json({
        message: err.meta?.cause || "Resource not found",
      });
    }
  }

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