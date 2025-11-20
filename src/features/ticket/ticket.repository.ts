import { prisma } from "../../lib/prisma";
import { CreateTicketSchemaRepository, UpdateTicketSchema} from "./ticket.schema";

export class TicketRepository {

    async getTicketsByUserId(userId: string) {
        return await prisma.ticket.findMany({ where: { createdById: userId } });
    }

    async getTicketById(id: string) {
        return await prisma.ticket.findUnique({ where: { id } });
    }

    async createTicket(data: CreateTicketSchemaRepository) {
        return await prisma.ticket.create({ data });
    }

    async updateTicket(id: string, data: UpdateTicketSchema) {
        return await prisma.ticket.update({
            data,
            where: { id },
        });
    }

    async deleteTicket(id: string) {
        return await prisma.ticket.delete({ where: { id } });
    }
}