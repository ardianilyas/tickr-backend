import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/response";
import { HttpStatus } from "../../constants/httpStatus";
import { validate } from "../../utils/validate";
import { updateUserRoleSchema } from "./user.schema";

export class UserController {
    constructor(private userService: UserService) {}

    getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.getUsers();

            return sendResponse(res, {
                status: HttpStatus.OK,
                message: "Users fetched",
                data: users
            });
        } catch (error) {
            next(error);
        }
    }

    updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;

            const data = validate(updateUserRoleSchema, req.body);

            const user = await this.userService.updateUserRole(id, data.role);

            return sendResponse(res, {
                status: HttpStatus.OK,
                message: "User role updated",
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
}