import { Router } from "express";
import { TicketRepository } from "./ticket.repository";
import { TicketService } from "./ticket.service";
import { TicketController } from "./ticket.controller";

const router = Router();

const ticketRepository = new TicketRepository();
const ticketService = new TicketService(ticketRepository);
const ticketController = new TicketController(ticketService);

router.get("/", ticketController.getTicketsByUserId);
router.get("/:id", ticketController.getTicketById);
router.post("/", ticketController.createTicket);
router.put("/:id", ticketController.updateTicket);
router.delete("/:id", ticketController.deleteTicket);

export default router;