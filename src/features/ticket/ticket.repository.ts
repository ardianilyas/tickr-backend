import { prisma } from "../../lib/prisma";
import { UserSelect } from "../../shared/constants/user.constant";
import { CreateTicketSchemaRepository, UpdateTicketSchema, UpdateTicketStatusSchemaRepository} from "./ticket.schema";

export class TicketRepository {

    async getAllTickets() {
        return await prisma.ticket.findMany();
    }

    async getTicketsByUserId(userId: string) {
        return await prisma.ticket.findMany({ where: { createdById: userId } });
    }

    async getTicketById(id: string) {
        return await prisma.ticket.findUnique({ 
            where: { id },
            include: {
                comments: {
                    include: {
                        user: { select: UserSelect }
                    }
                },
                createdBy: { select: UserSelect },
                handledBy: { select: UserSelect },
            },
        });
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

    async updateTicketStatus(id: string, data: UpdateTicketStatusSchemaRepository) {
        return await prisma.ticket.update({
            data,
            where: { id },
        });
    }

    async deleteTicket(id: string) {
        return await prisma.ticket.delete({ where: { id } });
    }
}