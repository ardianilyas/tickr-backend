import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import { TicketStatus, UserRole } from "../../generated/prisma/enums";
import { RequestUser } from "../../types/RequestUser";
import { logger } from "../../utils/logger";
import { TimelineService } from "../timeline/timeline.service";
import { TicketRepository } from "./ticket.repository";
import { CreateTicketSchemaRepository, UpdateTicketSchema, UpdateTicketStatusSchema } from "./ticket.schema";

export class TicketService {
    constructor(private ticketRepo: TicketRepository, private timelineService: TimelineService) {}

    async getAllTickets() {
        return await this.ticketRepo.getAllTickets();
    }

    async getTicketsByUserId(userId: string) {
        return await this.ticketRepo.getTicketsByUserId(userId);
    }

    async getTicketById(id: string, userId: string) {
        const ticket = await this.getTicketOrThrowError(id, userId);
        
        return ticket;
    }

    async createTicket(data: CreateTicketSchemaRepository, user: RequestUser) {
        try {
            const created = await this.ticketRepo.createTicket(data);

            // block logic for ticket timeline created
            await this.timelineService.createTicketTimeline(created.id, user);

            logger.info({ data }, "Ticket created");

            return created;
        } catch (error) {
            logger.error(`Failed to create ticket ${error}`);
            throw error;
        }
    }

    async updateTicket(id: string, data: UpdateTicketSchema, userId: string) {
        await this.getTicketOrThrowError(id, userId);
        
        try {
            const updated = await this.ticketRepo.updateTicket(id, data);

            logger.info({ updated }, "Ticket updated");
            
            return updated;
        } catch (error) {
            logger.error(`Failed to update ticket ${error}`);
            throw error;
        }
    }

    async deleteTicket(id: string, userId: string) {
        await this.getTicketOrThrowError(id, userId);

        try {
            const deleted = await this.ticketRepo.deleteTicket(id);

            logger.info({ deleted }, "Ticket deleted");

            return deleted;
        } catch (error) {
            logger.error(`Failed to delete ticket ${error}`);
            throw error;
        }
    }

    async updateTicketStatus(id: string, data: UpdateTicketStatusSchema, user: RequestUser) {
        const ticket = await this.ticketRepo.getTicketById(id);

        if (!ticket) throw new NotFoundError("Ticket not found");

        const canHandleFirstTime = !ticket.handledById;
        const isHandledByThisAdmin = ticket.handledById === user.id;

        if (!canHandleFirstTime && !isHandledByThisAdmin) throw new ForbiddenError("This ticket is alreade handled by another admin");

        try {
            const updated = await this.ticketRepo.updateTicketStatus(id, {...data, handledById: user.id});

            // block logic for ticket timeline assigned
            if (!ticket.handledById) {
                await this.timelineService.assignedTicketTimeline(id, user);
            }

            if (data.status !== TicketStatus.RESOLVED) {
                // block logic for ticket timeline status changed
                await this.timelineService.statusChangedTicketTimeline(id, user, data.status);
            } else {
                // block logic for ticket timeline status resolved
                await this.timelineService.resolvedTicketTimeline(id, user);
            }

            logger.info({ updated }, "Ticket status updated");

            return updated;
        } catch (error) {
            logger.error(`Failed to update ticket status ${error}`);
            throw error;
        }
    }
    
    async getTicketOrThrowError(id: string, userId: string) {
        const ticket = await this.ticketRepo.getTicketById(id);

        if (!ticket) throw new NotFoundError("Ticket not found");

        if (ticket?.createdById !== userId) throw new ForbiddenError("You dont have access to this resource");

        return ticket;
    }
}