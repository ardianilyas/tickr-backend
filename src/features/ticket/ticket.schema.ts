import z from "zod";
import { TicketStatus } from "../../generated/prisma/enums";

export const createTicketSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    categoryId: z.string().min(1, "Category is required"),
});

export const updateTicketSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    categoryId: z.string().min(1, "Category is required").optional(),
});

export const updateTicketStatusSchema = z.object({
    status: z.enum(TicketStatus),
});

export const updateTicketStatusSchemaRepository = updateTicketStatusSchema.extend({
    handledById: z.string(),
});

export const createTicketSchemaRepository = createTicketSchema.extend({ 
    createdById: z.string(), 
});

export type CreateTicketSchema = z.infer<typeof createTicketSchema>;
export type CreateTicketSchemaRepository = z.infer<typeof createTicketSchemaRepository>;
export type UpdateTicketSchema = z.infer<typeof updateTicketSchema>;
export type UpdateTicketStatusSchema = z.infer<typeof updateTicketStatusSchema>;
export type UpdateTicketStatusSchemaRepository = z.infer<typeof updateTicketStatusSchemaRepository>;