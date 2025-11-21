import { UserRole } from "../generated/prisma/enums";
import { checkRole } from "./checkRole.middleware";

export const allowUser = checkRole(UserRole.USER);
export const allowAdmin = checkRole(UserRole.ADMIN);
export const allowUserAndAdmin = checkRole(UserRole.USER, UserRole.ADMIN);