import { Request } from "express";
import { UserRole } from "../../generated/prisma/enums";
import { logger } from "../../utils/logger";
import { UserRepository } from "./user.repository";
import { paginate } from "../../utils/paginate";

export class UserService {
    constructor(private userRepo: UserRepository) {}

    async getUsers(req: Request) {
        const model = await this.userRepo.getUsers();

        const user = await paginate(model, req);

        return user;
    }

    async getUserById(id: string) {
        const user = await this.userRepo.getUserById(id);

        if (user) {
            const { createdTickets, ...rest } = user;
            return {
                ...rest,
                tickets: createdTickets
            }
        }

        return null;
    }

    async updateUserRole(id: string, role: UserRole) {
        try {
            const updated = await this.userRepo.updateUserRole(id, role);

            logger.info(
                { id, role },
                "User role updated"
            );

            return updated;
        } catch (error) {
            logger.error(`Failed to update user role ${error}`);
            throw error;
        }
    }
}