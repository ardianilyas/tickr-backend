import { Request, Response, Router } from "express";
import authRoutes from "../features/auth/routes/auth.routes";
import { authMiddleware } from "../middlewares/auth.middleware";

export const router = Router();

router.get("/health", authMiddleware, (req: Request, res: Response) => {
    res.status(200).json({ status: "OK" });
});

router.use("/auth", authRoutes);