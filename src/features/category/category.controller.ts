import { NextFunction, Request, Response } from "express";
import { validate } from "../../utils/validate";
import { CategoryService } from "./category.service";
import { createCategorySchema, updateCategorySchema } from "./category.schema";
import { sendResponse } from "../../utils/response";
import { HttpStatus } from "../../constants/httpStatus";

export class CategoryController {
    static async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await CategoryService.getCategories();
            return sendResponse(res, { data: categories });
        } catch (error) {
            next(error);
        }
    }

    static async getCategoryById(req: Request, res: Response, next: NextFunction) {
        try {
            const category = await CategoryService.getCategoryById(req.params.id);
            return sendResponse(res, { data: category });
        } catch (error) {
            next(error);
        }
    }

    static async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data = validate(createCategorySchema, req.body);

            const category = await CategoryService.createCategory(data);

            return sendResponse(res, {
                status: HttpStatus.CREATED,
                message: "Category created",
                data: category
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data = validate(updateCategorySchema, req.body);

            const category = await CategoryService.updateCategory(req.params.id, data);

            return sendResponse(res, {
                status: HttpStatus.OK,
                message: "Category updated",
                data: category
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteCategory(req: Request, res: Response, next: NextFunction) {
        try {
            await CategoryService.deleteCategory(req.params.id);
            return sendResponse(res, {
                status: HttpStatus.NO_CONTENT,
                message: "Category deleted"
            });
        } catch (error) {
            next(error);
        }
    }
}