import { prisma } from "../../lib/prisma";
import { CreateCategorySchema, UpdateCategorySchema } from "./category.schema";

export class CategoryRepository {
    static async getCategories() {
        return await prisma.category.findMany();
    }

    static async getCategoryById(id: string) {
        return await prisma.category.findUnique({ where: { id } });
    }

    static async createCategory(data: CreateCategorySchema) {
        return await prisma.category.create({ data });
    }

    static async updateCategory(id: string, data: UpdateCategorySchema) {
        return await prisma.category.update({
            data,
            where: { id },
        })
    }

    static async deleteCategory(id: string) {
        return await prisma.category.delete({ where: { id } });
    }
}