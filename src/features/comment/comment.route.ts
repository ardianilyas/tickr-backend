import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { CommentRepository } from "./comment.repository";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { TimelineService } from "../timeline/timeline.service";
import { TimelineRepository } from "../timeline/timeline.repository";

const commentRouter = Router();

// initiate repositories
const commentRepository = new CommentRepository();
const timelineRepository = new TimelineRepository();

// initiate services
const timelineService = new TimelineService(timelineRepository);
const commentService = new CommentService(commentRepository, timelineService);

const commentController = new CommentController(commentService);

commentRouter.use(authMiddleware);

commentRouter.post("/:ticketId", commentController.createComment);
commentRouter.delete("/:id", commentController.deleteComment);

export default commentRouter;