import { Request, Response } from "express";

/**
 * Send an error to the user.
 */
const sendError = (res: Response, status: number, code: number, msg: string) =>
    res.status(status).json({ code, msg });

// 404
export const notFound = (req: Request, res: Response) =>
    sendError(res, 404, 0, "Error: Not Found");

// 421
export const unauthorized = (req: Request, res: Response) =>
    sendError(res, 421, 1, "Error: Unauthorized");
