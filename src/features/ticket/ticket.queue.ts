import { createQueue } from "../../lib/bullmq";
import { TicketJobData } from "./ticket.types";

export const TICKET_QUEUE_NAME = "ticket_queue";

export const ticketQueue = createQueue<TicketJobData>(TICKET_QUEUE_NAME);