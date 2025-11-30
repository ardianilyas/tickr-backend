import { prisma } from "../../lib/prisma";
import { TicketTimelineSchema } from "./timeline.schema";

export class TimelineRepository {
    async createTicketTimeline(data: TicketTimelineSchema) {
        return await prisma.ticketTimeline.create({ data });
    }
}