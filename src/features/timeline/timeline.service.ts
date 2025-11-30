import { TicketStatus, TimelineEventType } from "../../generated/prisma/enums";
import { RequestUser } from "../../types/RequestUser";
import { TimelineRepository } from "./timeline.repository";

export class TimelineService {
    constructor(private timelineRepo: TimelineRepository) {}

    async createTicketTimeline(ticketId: string, user: RequestUser) {
        return await this.timelineRepo.createTicketTimeline({
            title: "Ticket created",
            description: `Ticket created by ${user.name}`,
            ticketId,
            userId: user.id,
            eventType: TimelineEventType.CREATED
        });
    }

    async assignedTicketTimeline(ticketId: string, user: RequestUser) {
        return await this.timelineRepo.createTicketTimeline({
            title: "Ticket assigned",
            description: `Ticket assigned to ${user.name}`,
            ticketId,
            userId: user.id,
            eventType: TimelineEventType.ASSIGNED
        })
    }

    async commentedTicketTimeline(ticketId: string, user: RequestUser) {
        return await this.timelineRepo.createTicketTimeline({
            title: "Ticket commented",
            description: `Ticket commented by ${user.name}`,
            ticketId,
            userId: user.id,
            eventType: TimelineEventType.COMMENTED
        })
    }

    async statusChangedTicketTimeline(ticketId: string, user: RequestUser, status: TicketStatus) {
        return await this.timelineRepo.createTicketTimeline({
            title: "Ticket status changed",
            description: `Ticket status changed by ${user.name} to be ${status}`,
            ticketId,
            userId: user.id,
            eventType: TimelineEventType.STATUS_CHANGED
        })
    }

    async resolvedTicketTimeline(ticketId: string, user: RequestUser) {
        return await this.timelineRepo.createTicketTimeline({
            title: "Ticket resolved",
            description: `Ticket resolved by ${user.name}`,
            ticketId,
            userId: user.id,
            eventType: TimelineEventType.RESOLVED
        })
    }
}