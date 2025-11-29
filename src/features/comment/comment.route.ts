import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { CommentRepository } from "./comment.repository";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";

const commentRouter = Router();

const commentRepository = new CommentRepository();
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

commentRouter.use(authMiddleware);

commentRouter.post("/:ticketId", commentController.createComment);
commentRouter.delete("/:id", commentController.deleteComment);

export default commentRouter;