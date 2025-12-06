import { createQueue } from "../../lib/bullmq";

export const TICKET_QUEUE_NAME = "ticket_queue";

export const ticketQueue = createQueue(TICKET_QUEUE_NAME);