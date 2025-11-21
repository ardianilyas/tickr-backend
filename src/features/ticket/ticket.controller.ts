import { NextFunction, Request, Response } from "express";
import { TicketService } from "./ticket.service";
import { sendResponse } from "../../utils/response";
import { HttpStatus } from "../../constants/httpStatus";
import { validate } from "../../utils/validate";
import { createTicketSchema, updateTicketSchema } from "./ticket.schema";

export class TicketController {
    constructor(private ticketService: TicketService) {}

    getTicketsByUserId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tickets = await this.ticketService.getTicketsByUserId(req.user?.id!);
            return sendResponse(res, {
                status: HttpStatus.OK,
                message: "Tickets fetched",
                data: tickets
            });
        } catch (error) {
            next(error);
        }
    }

    getTicketById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ticket = await this.ticketService.getTicketById(req.params.id, req.user?.id!);
            return sendResponse(res, {
                status: HttpStatus.OK,
                message: "Ticket fetched",
                data: ticket
            });
        } catch (error) {
            next(error);
        }
    }

    createTicket = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = validate(createTicketSchema, req.body);

            const ticket = await this.ticketService.createTicket({ ...data, createdById: req.user?.id! });
            return sendResponse(res, {
                status: HttpStatus.CREATED,
                message: "Ticket created",
                data: ticket
            });
        } catch (error) {
            next(error);
        }
    }

    updateTicket = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const data = validate(updateTicketSchema, req.body);
            const ticket = await this.ticketService.updateTicket(id, data, req.user?.id!);
            return sendResponse(res, {
                status: HttpStatus.OK,
                message: "Ticket updated",
                data: ticket
            });
        } catch (error) {
            next(error);
        }
    }

    deleteTicket = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            await this.ticketService.deleteTicket(id, req.user?.id!);
            return sendResponse(res, {
                status: HttpStatus.OK,
                message: "Ticket deleted"
            });
        } catch (error) {
            next(error);
        }
    }
}