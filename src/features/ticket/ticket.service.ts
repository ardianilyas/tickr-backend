import { TicketRepository } from "./ticket.repository";
import { CreateTicketSchemaRepository, UpdateTicketSchema } from "./ticket.schema";

export class TicketService {
    constructor(private ticketRepo: TicketRepository) {}

    async getTicketsByUserId(userId: string) {
        return await this.ticketRepo.getTicketsByUserId(userId);
    }

    async getTicketById(id: string) {
        return await this.ticketRepo.getTicketById(id);
    }

    async createTicket(data: CreateTicketSchemaRepository) {
        return await this.ticketRepo.createTicket(data);
    }

    async updateTicket(id: string, data: UpdateTicketSchema) {
        return await this.ticketRepo.updateTicket(id, data);
    }

    async deleteTicket(id: string) {
        return await this.ticketRepo.deleteTicket(id);
    }
}