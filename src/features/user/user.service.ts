import { UserRole } from "../../generated/prisma/enums";
import { logger } from "../../utils/logger";
import { UserRepository } from "./user.repository";

export class UserService {
    constructor(private userRepo: UserRepository) {}

    async getUsers() {
        return await this.userRepo.getUsers();
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