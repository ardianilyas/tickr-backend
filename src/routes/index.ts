import { Request, Response, Router } from "express";
import authRoutes from "../features/auth/routes/auth.routes";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/checkRole.middleware";
import { UserRole } from "../generated/prisma/enums";

export const router = Router();

router.get("/health", authMiddleware, checkRole(UserRole.ADMIN), (req: Request, res: Response) => {
    res.status(200).json({ status: "OK" });
});

router.use("/auth", authRoutes);