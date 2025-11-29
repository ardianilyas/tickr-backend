import { Request, Response, Router } from "express";

import authRoutes from "../features/auth/routes/auth.routes";
import categoryRoutes from "../features/category/category.route";
import ticketRoutes from "../features/ticket/ticket.route";

import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/checkRole.middleware";
import { UserRole } from "../generated/prisma/enums";
import userRouter from "../features/user/user.route";
import commentRouter from "../features/comment/comment.route";

const router = Router();

router.get("/health", authMiddleware, checkRole(UserRole.ADMIN), (req: Request, res: Response) => {
    res.status(200).json({ status: "OK" });
});

router.use("/auth", authRoutes);
router.use("/categories", authMiddleware, checkRole(UserRole.ADMIN), categoryRoutes);
router.use("/comments", commentRouter);
router.use("/admin/tickets", authMiddleware, ticketRoutes.adminRouter);
router.use("/tickets", authMiddleware, ticketRoutes.userRouter);

router.use("/admin/users", userRouter);

export default router;