import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { checkRole } from "../../middlewares/checkRole.middleware";
import { UserRole } from "../../generated/prisma/enums";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

const userRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.use(authMiddleware, checkRole(UserRole.ADMIN));

userRouter.get("/", userController.getUsers);
userRouter.patch("/:id/role", userController.updateUserRole);

export default userRouter;