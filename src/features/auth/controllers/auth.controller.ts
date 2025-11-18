import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { env } from "../../../config/env";
import { validate } from "../../../utils/validate";
import { loginSchema, registerSchema } from "../schema/auth.schema";

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const data = validate(registerSchema, req.body);

            await AuthService.register(data);

            res.status(201).json({ message: "User registered" })
        } catch (error: any) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const data = validate(loginSchema, req.body);

            const { token } = await AuthService.login(data);

            res.cookie("access_token", token , {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000
            });

            res.json({ message: "User logged in", token });
        } catch (error: any) {
            next(error);
        }
    }

    static async logout(req: Request, res: Response) {
        res.clearCookie("access_token");
        res.json({ message: "User logged out" });
    }
}