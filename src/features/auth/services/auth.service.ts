import { ConflictError } from "../../../errors/ConflictError";
import { UnauthorizedError } from "../../../errors/UnauthorizedError";
import { comparePassword, hashPassword } from "../../../utils/bcrypt";
import { signAccessToken } from "../../../utils/jwt";
import { AuthRepository } from "../repositories/auth.repository";
import { LoginSchema, RegisterSchema } from "../schema/auth.schema";

export class AuthService {
    static async register(data: RegisterSchema) {
        const exists = await AuthRepository.getUserByEmail(data.email);

        if (exists) throw new ConflictError("User already registered");

        const hashed = await hashPassword(data.password);

        return await AuthRepository.register({ ...data, password: hashed });
    }

    static async login(data: LoginSchema) {
        const user = await AuthRepository.getUserByEmail(data.email);

        if (!user) throw new UnauthorizedError("Invalid credentials");

        const validPassword = await comparePassword(data.password, user.password);

        if (!validPassword) throw new UnauthorizedError("Invalid credentials");

        const token = signAccessToken({ id: user.id, role: user.role, name: user.name });

        return { token };
    }
}