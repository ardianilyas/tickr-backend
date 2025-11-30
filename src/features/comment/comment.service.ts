import { ForbiddenError } from "../../errors/ForbiddenError";
import { UserRole } from "../../generated/prisma/enums";
import { RequestUser } from "../../types/RequestUser";
import { logger } from "../../utils/logger";
import { TimelineService } from "../timeline/timeline.service";
import { CommentRepository } from "./comment.repository";
import { CreateCommentSchema } from "./comment.schema";

export class CommentService {
    constructor(private commentRepo: CommentRepository, private timelineService: TimelineService) {}

    async createComment(data: CreateCommentSchema, user: RequestUser) {
        const ticket = await this.commentRepo.getTicketById(data.ticketId);

        if (user.id !== ticket?.createdById && user.role !== UserRole.ADMIN) throw new ForbiddenError("You dont have access to this resource");
        
        try {
            const comment = await this.commentRepo.createComment(data);
            logger.info({ comment }, "Comment created");

            // block logic for ticket timeline commented
            await this.timelineService.commentedTicketTimeline(data.ticketId, user);

            return comment;
        } catch (error) {
            logger.error(`Failed to create comment ${error}`);
            throw error;
        }
    }

    async deleteComment(id: string, user: RequestUser) {
        const comment = await this.commentRepo.getCommentById(id);

        if (user.id !== comment?.userId) throw new ForbiddenError("You dont have access to this resource");

        try {
            const deleted = await this.commentRepo.deleteComment(id);

            logger.info({ deleted }, "Comment deleted");

            return deleted;
        } catch (error) {
            logger.error(`Failed to delete comment ${error}`);
            throw error;
        }
    }
}