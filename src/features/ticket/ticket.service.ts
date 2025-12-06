import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import { TicketStatus, UserRole } from "../../generated/prisma/enums";
import { RequestUser } from "../../types/RequestUser";
import { logger } from "../../utils/logger";
import { TimelineService } from "../timeline/timeline.service";
import { ticketQueue } from "./ticket.queue";
import { TicketRepository } from "./ticket.repository";
import { CreateTicketSchema, CreateTicketSchemaRepository, UpdateTicketSchema, UpdateTicketStatusSchema } from "./ticket.schema";

export class TicketService {
    constructor(private ticketRepo: TicketRepository, private timelineService: TimelineService) {}

    private prefixCode = "TCK-";

    private generateNextCode(lastCode: string | null): string {
        if (!lastCode) return `${this.prefixCode}0001`;

        const lastNumber = parseInt(lastCode.split("-").pop()!, 10);
        const nextNumber = lastNumber + 1;

        const padded = nextNumber.toString().padStart(4, "0");

        return `${this.prefixCode}${padded}`;
    }

    async getAllTickets() {
        return await this.ticketRepo.getAllTickets();
    }

    async getTicketsByUserId(userId: string) {
        return await this.ticketRepo.getTicketsByUserId(userId);
    }

    async getTicketById(id: string, user: RequestUser) {
        const ticket = await this.getTicketOrThrowError(id, user);
        
        return ticket;
    }

    async createTicket(data: CreateTicketSchema, user: RequestUser) {
        const lastCode = await this.ticketRepo.getLastTicketCode();
        const code = this.generateNextCode(lastCode);
        
        try {
            const created = await this.ticketRepo.createTicket({ ...data, createdById: user.id, code });

            if (data.priority === "URGENT") {
                await ticketQueue.add("urgent_ticket", {
                   id: created.id,
                   priority: created.priority, 
                });
            }

            // block logic for ticket timeline created
            await this.timelineService.createTicketTimeline(created.id, user);

            logger.info({ data }, "Ticket created");

            return created;
        } catch (error) {
            logger.error(`Failed to create ticket ${error}`);
            throw error;
        }
    }

    async updateTicket(id: string, data: UpdateTicketSchema, user: RequestUser) {
        await this.getTicketOrThrowError(id, user);
        
        try {
            const updated = await this.ticketRepo.updateTicket(id, data);

            logger.info({ updated }, "Ticket updated");
            
            return updated;
        } catch (error) {
            logger.error(`Failed to update ticket ${error}`);
            throw error;
        }
    }

    async deleteTicket(id: string, user: RequestUser) {
        await this.getTicketOrThrowError(id, user);

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
    
    async getTicketOrThrowError(id: string, user: RequestUser) {
        const ticket = await this.ticketRepo.getTicketById(id);

        if (!ticket) throw new NotFoundError("Ticket not found");

        if (ticket?.createdById !== user.id && user.role !== UserRole.ADMIN) throw new ForbiddenError("You dont have access to this resource");

        return ticket;
    }
}