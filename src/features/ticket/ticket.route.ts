import { Router } from "express";
import { TicketRepository } from "./ticket.repository";
import { TicketService } from "./ticket.service";
import { TicketController } from "./ticket.controller";
import { allowAdmin, allowUserAndAdmin } from "../../middlewares/roleGuard";

const router = Router();
const userRouter = router;
const adminRouter = router;

const ticketRepository = new TicketRepository();
const ticketService = new TicketService(ticketRepository);
const ticketController = new TicketController(ticketService);

userRouter.use(allowUserAndAdmin);
userRouter.get("/", ticketController.getTicketsByUserId);
userRouter.get("/:id", ticketController.getTicketById);
userRouter.post("/", ticketController.createTicket);
userRouter.put("/:id", ticketController.updateTicket);
userRouter.delete("/:id", ticketController.deleteTicket);

adminRouter.use(allowAdmin);
adminRouter.put("/:id/status", ticketController.updateTicketStatus);

router.use("/", userRouter);
router.use("/", adminRouter);

export default router;