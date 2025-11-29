import z, { string } from "zod";

export const createCommentSchema = z.object({
    body: z.string().min(1, "Body is required"),
});

export const createCommentSchemaRepository = createCommentSchema.extend({
    ticketId: z.string(),
    userId: z.string(),
})

export type CreateCommentSchema = z.infer<typeof createCommentSchemaRepository>;