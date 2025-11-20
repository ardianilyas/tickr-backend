import z from "zod";
import { TicketStatus } from "../../generated/prisma/enums";

export const createTicketSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    categoryId: z.string().min(1, "Category is required"),
    status: z.enum(TicketStatus),
});

export const updateTicketSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    categoryId: z.string().min(1, "Category is required"),
    status: z.enum(TicketStatus),
});

export const createTicketSchemaRepository = createTicketSchema.extend({ 
    createdById: z.string(), 
    handledById: z.string().optional() 
});

export const updateTicketSchemaRepository = createTicketSchema.extend({ 
    createdById: z.string(), 
    handledById: z.string().optional() 
});

export type CreateTicketSchema = z.infer<typeof createTicketSchema>;
export type CreateTicketSchemaRepository = z.infer<typeof createTicketSchemaRepository>;
export type UpdateTicketSchema = z.infer<typeof updateTicketSchema>;
export type UpdateTicketSchemaRepository = z.infer<typeof updateTicketSchemaRepository>;