import { Request, Response } from "express";

/**
 * Send an error to the user.
 */
const sendError = (res: Response, status: number, code: number, msg: string) =>
    res.status(status).json({ code, msg });

type EF = (req: Request, res: Response) => ReturnType<typeof sendError>;

// 404 Not Found
export const notFound: EF = (req, res) =>
    sendError(res, 404, 0, "Error: Not Found");

// 401 Unauthorized
export const unauthorized: EF = (req, res) =>
    sendError(res, 401, 1, "Error: Unauthorized");

// 400 Bad Request
export const badRequest: EF = (req, res) =>
    sendError(res, 400, 2, "Error: Bad Request");

// 500 Server Error
export const serverError: EF = (req, res) =>
    sendError(res, 500, 3, "Error: Server-side Error");

// 501 Not implemented
export const notImplemented: EF = (req, res) =>
    sendError(res, 501, 4, "Error: Not Implemented");
