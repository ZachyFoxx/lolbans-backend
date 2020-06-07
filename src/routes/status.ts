import { Request, Response } from "express";

import { VERSION } from "../utils/env";

export const status = (req: Request, res: Response) => res.json({ v: VERSION });
