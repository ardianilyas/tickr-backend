// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Error handler dipanggil:', err); // Tambahkan ini dulu!!

  // Khusus validation error dari validatedBody
  if (err.statusCode === 400 && err.validationErrors) {
    return res.status(400).json({
      message: 'Validasi gagal',
      errors: err.validationErrors,
    });
  }

  // Kalau ZodError langsung
  if (err.name === 'ZodError') {
    return res.status(400).json({
      message: 'Validasi gagal',
      errors: err.errors.map((e: any) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  // Default
  console.error('Unhandled error:', err);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Server error',
  });
};