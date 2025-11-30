import { NextFunction, Request, Response } from "express";
import { TicketService } from "./ticket.service";
import { sendResponse } from "../../utils/response";
import { HttpStatus } from "../../constants/httpStatus";
import { validate } from "../../utils/validate";
import { createTicketSchema, updateTicketSchema, updateTicketStatusSchema } from "./ticket.schema";

export class TicketController {
    constructor(private ticketService: TicketService) {}

    getAllTickets = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tickets = await this.ticketService.getAllTickets();
            return sendResponse(res, {
                status: HttpStatus.OK,
                message: "Tickets fetched",
                data: tickets
            });
        } catch (error) {
            next(error);
        }
    }

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
            const ticket = await this.ticketService.getTicketById(req.params.id, req.user!);
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

            const ticket = await this.ticketService.createTicket({ ...data, createdById: req.user?.id! }, req.user!);
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
            const ticket = await this.ticketService.updateTicket(id, data, req.user!);
            return sendResponse(res, {
                status: HttpStatus.OK,
                message: "Ticket updated",
                data: ticket
            });
        } catch (error) {
            next(error);
        }
    }

    updateTicketStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = validate(updateTicketStatusSchema, req.body);
            const user = req.user;
            const ticket = await this.ticketService.updateTicketStatus(req.params.id, data, user!);
            return sendResponse(res, {
                status: HttpStatus.OK,
                message: "Ticket status updated",
                data: ticket,
            });
        } catch (error) {
            next(error);
        }
    }

    deleteTicket = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            await this.ticketService.deleteTicket(id, req.user!);
            return sendResponse(res, {
                status: HttpStatus.OK,
                message: "Ticket deleted"
            });
        } catch (error) {
            next(error);
        }
    }
}