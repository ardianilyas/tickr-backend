import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import { TicketRepository } from "./ticket.repository";
import { CreateTicketSchemaRepository, UpdateTicketSchema } from "./ticket.schema";

export class TicketService {
    constructor(private ticketRepo: TicketRepository) {}

    async getTicketsByUserId(userId: string) {
        return await this.ticketRepo.getTicketsByUserId(userId);
    }

    async getTicketById(id: string, userId: string) {
        const ticket = await this.getTicketOrThrowError(id, userId);
        
        return ticket;
    }

    async createTicket(data: CreateTicketSchemaRepository) {
        return await this.ticketRepo.createTicket(data);
    }

    async updateTicket(id: string, data: UpdateTicketSchema, userId: string) {
        await this.getTicketOrThrowError(id, userId);
        
        return await this.ticketRepo.updateTicket(id, data);
    }

    async deleteTicket(id: string, userId: string) {
        await this.getTicketOrThrowError(id, userId);

        return await this.ticketRepo.deleteTicket(id);
    }

    async getTicketOrThrowError(id: string, userId: string) {
        const ticket = await this.ticketRepo.getTicketById(id);

        if (!ticket) throw new NotFoundError("Ticket not found");

        if (ticket?.createdById !== userId) throw new ForbiddenError("You dont have access to this resource");

        return ticket;
    }
}