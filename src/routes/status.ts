import { Request, Response } from "express";

import { VERSION } from "../utils/env";

/**
 * Utility route for checking the API is alive.
 */
export const status = (req: Request, res: Response) =>
    res.json({ v: VERSION, msg: "Zach is Gay <3" });
