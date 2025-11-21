import { Router } from "express";
import { TicketRepository } from "./ticket.repository";
import { TicketService } from "./ticket.service";
import { TicketController } from "./ticket.controller";
import { allowAdmin, allowUserAndAdmin } from "../../middlewares/roleGuard";

const userRouter = Router();
const adminRouter = Router();

const ticketRepository = new TicketRepository();
const ticketService = new TicketService(ticketRepository);
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