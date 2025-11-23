import { UserRole } from "../../generated/prisma/enums";
import { UserRepository } from "./user.repository";

export class UserService {
    constructor(private userRepo: UserRepository) {}

    async getUsers() {
        return await this.userRepo.getUsers();
    }

    async updateUserRole(id: string, role: UserRole) {
        return await this.userRepo.updateUserRole(id, role);
    }
}