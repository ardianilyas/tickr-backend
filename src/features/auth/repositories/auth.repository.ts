import { prisma } from "../../../lib/prisma";
import { RegisterSchema } from "../schema/auth.schema";

export class AuthRepository {
    static async register(data: RegisterSchema) {
        return await prisma.user.create({ data });
    }

    static async getUserByEmail(email: string) {
        return await prisma.user.findUnique({ where: { email } });
    }
}