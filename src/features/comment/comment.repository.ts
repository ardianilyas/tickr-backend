import { prisma } from "../../lib/prisma";
import { CreateCommentSchema } from "./comment.schema";

export class CommentRepository {
    async getTicketById(id: string) {
        return await prisma.ticket.findUnique({ where: { id } });
    }
    
    async getCommentById(id: string) {
        return await prisma.comment.findUnique({ where: { id } });
    }

    async createComment(data: CreateCommentSchema) {
        return await prisma.comment.create({ data });
    }

    async deleteComment(id: string) {
        return await prisma.comment.delete({ where: { id } });
    }
}