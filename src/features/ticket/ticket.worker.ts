import TicketUrgentEmail from "../../emails/TicketUrgentEmail";
import { TicketPriority } from "../../generated/prisma/enums";
import { resend } from "../../lib/resend";
import { logger } from "../../utils/logger";
import { TICKET_QUEUE_NAME } from "./ticket.queue";
import { TicketJobData } from "./ticket.types";

export const ticketWorker = {
  queueName: TICKET_QUEUE_NAME,

  processor: async (job: { data: TicketJobData }) => {
    const { priority, ticketCode } = job.data;

    logger.info({ data: job.data }, "📥 Ticket Job Received:");

    if (priority === TicketPriority.URGENT) {
      logger.info(`📥 Urgent Ticket Job with Ticket Code ${ticketCode} Received:`);

      // soon send email for admin here
      const { data, error } = await resend.emails.send({
        from: "Tickr <onboarding@resend.dev>",
        to: "delivered@resend.dev",
        subject: "Urgent Ticket Report",
        react: TicketUrgentEmail({ username: "Ardian Ilyas", ticketCode }),
      });

      if (error) throw Error(error.message);

      logger.info({ data }, "📤 Urgent Ticket Job Sent");
    }

    return { status: "done" };
  }
};