import { TicketPriority } from "../../generated/prisma/enums";
import { TICKET_QUEUE_NAME } from "./ticket.queue";
import { TicketJobData } from "./ticket.types";

export const ticketWorker = {
  queueName: TICKET_QUEUE_NAME,

  processor: async (job: { data: TicketJobData }) => {
    const { ticketId, priority } = job.data;

    console.log("📥 Ticket Job Received:", job.data);

    if (priority === TicketPriority.URGENT) {
      console.log("📥 Urgent Ticket Job Received:", job.data);
      // soon send email for admin here
    }

    return { status: "done" };
  }
};