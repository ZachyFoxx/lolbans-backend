import { Request, Response } from "express";

/**
 * Send an error to the user.
 */
const sendError = (res: Response, status: number, code: number, msg: string) =>
    res.status(status).json({ code, msg });

// 404
export const notFound = (req: Request, res: Response) =>
    sendError(res, 404, 0, "Error: Not Found");

// 401
export const unauthorized = (req: Request, res: Response) =>
    sendError(res, 401, 1, "Error: Unauthorized");

// 400
export const badRequest = (req: Request, res: Response) =>
    sendError(res, 400, 2, "Error: Bad Request");
