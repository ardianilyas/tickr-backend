import { NextFunction, Request, Response } from "express";
import { CommentService } from "./comment.service";
import { sendResponse } from "../../utils/response";
import { HttpStatus } from "../../constants/httpStatus";
import { validate } from "../../utils/validate";
import { createCommentSchema } from "./comment.schema";

export class CommentController {
    constructor(private commentService: CommentService) {}

    createComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = validate(createCommentSchema, req.body);

            const { ticketId } = req.params;

            const userId = req.user?.id!;

            const comment = await this.commentService.createComment({ ...data, ticketId, userId }, req.user!);

            return sendResponse(res, {
                status: HttpStatus.CREATED,
                message: "Comment created",
                data: comment
            });
        } catch (error) {
            next(error);
        }
    }

    deleteComment = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            await this.commentService.deleteComment(id, req.user!);

            return sendResponse(res, {
                status: HttpStatus.NO_CONTENT,
                message: "Comment deleted"
            });
        } catch (error) {
            next(error);
        }
    }
}