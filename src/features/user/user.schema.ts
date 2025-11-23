import z from "zod";
import { UserRole } from "../../generated/prisma/enums";

export const updateUserRoleSchema = z.object({
    role: z.enum(UserRole),
});

export type UpdateUserRoleSchema = z.infer<typeof updateUserRoleSchema>;