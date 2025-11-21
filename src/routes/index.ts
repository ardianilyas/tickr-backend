import { Request, Response, Router } from "express";

import authRoutes from "../features/auth/routes/auth.routes";
import categoryRoutes from "../features/category/category.route";
import ticketRoutes from "../features/ticket/ticket.route";

import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/checkRole.middleware";
import { UserRole } from "../generated/prisma/enums";

const router = Router();

router.get("/health", authMiddleware, checkRole(UserRole.ADMIN), (req: Request, res: Response) => {
    res.status(200).json({ status: "OK" });
});

router.use("/auth", authRoutes);
router.use("/categories", authMiddleware, checkRole(UserRole.ADMIN), categoryRoutes);
router.use("/admin/tickets", authMiddleware, ticketRoutes.adminRouter);
router.use("/tickets", authMiddleware, ticketRoutes.userRouter);

export default router;