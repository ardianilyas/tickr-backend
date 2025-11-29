import { ForbiddenError } from "../../errors/ForbiddenError";
import { UserRole } from "../../generated/prisma/enums";
import { RequestUser } from "../../types/RequestUser";
import { CommentRepository } from "./comment.repository";
import { CreateCommentSchema } from "./comment.schema";

export class CommentService {
    constructor(private commentRepo: CommentRepository) {}

    async createComment(data: CreateCommentSchema, user: RequestUser) {
        const ticket = await this.commentRepo.getTicketById(data.ticketId);

        if (user.id !== ticket?.createdById || user.role !== UserRole.ADMIN) throw new ForbiddenError("You dont have access to this resource");
        
        return await this.commentRepo.createComment(data);
    }

    async deleteComment(id: string, user: RequestUser) {
        const comment = await this.commentRepo.getCommentById(id);

        if (user.id !== comment?.userId) throw new ForbiddenError("You dont have access to this resource");

        return await this.commentRepo.deleteComment(id);
    }
}