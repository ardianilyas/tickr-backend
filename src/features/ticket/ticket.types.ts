import { TicketPriority } from "../../generated/prisma/enums"

export interface TicketJobData {
    ticketId: string,
    priority: TicketPriority
}