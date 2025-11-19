import { NextFunction, Request, Response } from "express";
import { UserRole } from "../generated/prisma/enums";

type AllowedRole = UserRole;

export function checkRole(...allowedRoles: AllowedRole[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.user) return res.status(401).json({ message: "Unauthorized" });

        if(!allowedRoles.includes(req.user?.role as AllowedRole)) {
            return res.status(403).json({ message: "Forbidden: Insufficient role" });
        }

        next();
    }
}