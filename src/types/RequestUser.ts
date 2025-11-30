import { UserRole } from "../generated/prisma/enums";

export interface RequestUser {
    id: string;
    name: string,
    role: UserRole;
}