import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt"; 

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.access_token;

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const user = verifyAccessToken(token);
    (req as any).user = user;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}