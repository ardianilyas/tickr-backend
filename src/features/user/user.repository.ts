import { UserRole } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

export class UserRepository {
    async getUsers() {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            },
        });
    }

    async getUserById(id: string) {
        return await prisma.user.findUniqueOrThrow({ 
            where: { id },
            include: {
                createdTickets: true,
            },
        });
    }

    async updateUserRole(id: string, role: UserRole) {
        return await prisma.user.update({
            where: { id },
            data: { role },
        });
    }
}