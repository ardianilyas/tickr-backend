import { Router } from "express";
import { TicketRepository } from "./ticket.repository";
import { TicketService } from "./ticket.service";
import { TicketController } from "./ticket.controller";
import { allowAdmin, allowUserAndAdmin } from "../../middlewares/roleGuard";
import { TimelineRepository } from "../timeline/timeline.repository";
import { TimelineService } from "../timeline/timeline.service";

const userRouter = Router();
const adminRouter = Router();

// initiate repositories
const ticketRepository = new TicketRepository();
const timelineRepository = new TimelineRepository();

// initiate services
const timelineService = new TimelineService(timelineRepository);
const ticketService = new TicketService(ticketRepository, timelineService);

const ticketController = new TicketController(ticketService);

adminRouter.use(allowAdmin);
adminRouter.get("/", ticketController.getAllTickets);
adminRouter.post("/:id/status", ticketController.updateTicketStatus);

userRouter.use(allowUserAndAdmin);
userRouter.get("/", ticketController.getTicketsByUserId);
userRouter.get("/:id", ticketController.getTicketById);
userRouter.post("/", ticketController.createTicket);
userRouter.patch("/:id/update", ticketController.updateTicket);
userRouter.delete("/:id", ticketController.deleteTicket);

export default { userRouter, adminRouter };