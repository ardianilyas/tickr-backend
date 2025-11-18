import { ZodSchema, ZodError } from 'zod';

export class ValidationError extends Error {
    statusCode = 400;
    errors: Array<{ field: string; message: string }>;
  
    constructor(zodError: ZodError) {
      super('Validation failed');
      this.name = 'ValidationError';
      this.errors = zodError.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
    }
}

export const validate = <T>(schema: ZodSchema<T>, body: any): T => {
    const result = schema.safeParse(body);
  
    if (!result.success) {
      // JANGAN PAKAI custom class dulu → pakai object langsung
      const error = new Error('Validation failed') as any;
      error.statusCode = 400;
      error.validationErrors = result.error.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      throw error;
    }
  
    return result.data;
};