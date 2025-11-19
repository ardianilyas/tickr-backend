import { NextFunction, Request, Response } from "express";
import { validate } from "../../utils/validate";
import { CategoryService } from "./category.service";
import { createCategorySchema, updateCategorySchema } from "./category.schema";

export class CategoryController {
    static async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await CategoryService.getCategories();
            return res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    static async getCategoryById(req: Request, res: Response, next: NextFunction) {
        try {
            const category = await CategoryService.getCategoryById(req.params.id);
            return res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }

    static async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data = validate(createCategorySchema, req.body);

            const category = await CategoryService.createCategory(data);

            res.status(201).json({
                message: "Category created",
                category
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data = validate(updateCategorySchema, req.body);

            const category = await CategoryService.updateCategory(req.params.id, data);

            return res.status(200).json({ 
                message: "Category updated", 
                category
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteCategory(req: Request, res: Response, next: NextFunction) {
        try {
            await CategoryService.deleteCategory(req.params.id);
            return res.status(204).json({ 
                message: "Category deleted", 
            });
        } catch (error) {
            next(error);
        }
    }
}