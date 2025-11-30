import z from "zod";
import { TimelineEventType } from "../../generated/prisma/enums";

export const ticketTimelineSchema = z.object({
    title: z.string(),
    description: z.string(),
    ticketId: z.string(),
    userId: z.string(),
    eventType: z.enum(TimelineEventType),
});

export type TicketTimelineSchema = z.infer<typeof ticketTimelineSchema>;