import { Request } from "express";
import { UserRole } from "../generated/prisma/enums";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: UserRole, name: string };
    }
  }
}