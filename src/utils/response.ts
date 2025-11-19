import { Response } from "express";

export const sendResponse = (
    res: Response, 
    { status = 200, message = "", data = null, meta = null } : { status?: number, message?: string, data?: any, meta?: any }
) => {
    const payload: any = { message };

    if (data !== null) payload.data = data;

    if (meta !== null) payload.meta = meta;

    return res.status(status).json(payload);
}