import { NotFoundError } from "../../errors/NotFoundError";
import { logger } from "../../utils/logger";
import { CategoryRepository } from "./category.repository";
import { CreateCategorySchema, UpdateCategorySchema } from "./category.schema";

export class CategoryService {
    static async getCategories() {
        return await CategoryRepository.getCategories();
    }

    static async getCategoryById(id: string) {
        const category = await CategoryRepository.getCategoryById(id);
        if(!category) throw new NotFoundError("Category not found");
        return category;
    }

    static async createCategory(data: CreateCategorySchema) {
        try {
            const created = await CategoryRepository.createCategory(data);

            logger.info({ created }, "Category created");

            return created;
        } catch (error) {
            logger.error(`Failed to create category ${error}`);
            throw error;
        }
    }

    static async updateCategory(id: string, data: UpdateCategorySchema) {
        try {
            const updated = await CategoryRepository.updateCategory(id, data);

            if(!updated) throw new NotFoundError("Category not found");

            logger.info({ updated }, "Category updated");

            return updated;
        } catch (error) {
            logger.error(`Failed to update category ${error}`);
            throw error;
        }
    }

    static async deleteCategory(id: string) {
        try {
            const deleted = await CategoryRepository.deleteCategory(id);

            if(!deleted) throw new NotFoundError("Category not found");
            
            logger.info({ deleted }, "Category deleted");

            return deleted;
        } catch (error) {
            logger.error(`Failed to delete category ${error}`);
            throw error;
        }
    }
}