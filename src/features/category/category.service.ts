import { NotFoundError } from "../../errors/NotFoundError";
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
        return await CategoryRepository.createCategory(data);
    }

    static async updateCategory(id: string, data: UpdateCategorySchema) {
        const updated = await CategoryRepository.updateCategory(id, data);
        if(!updated) throw new NotFoundError("Category not found");
        return updated;
    }

    static async deleteCategory(id: string) {
        const deleted = await CategoryRepository.deleteCategory(id);
        if(!deleted) throw new NotFoundError("Category not found");
        return deleted;
    }
}