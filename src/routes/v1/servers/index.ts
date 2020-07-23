import { Router } from "express";

import { RH } from "../../types";
import { createServer } from "./create";

/**
 * Manage servers.
 * @param s
 */
export const servers: RH = (s) =>
    Router()
        // Create server route
        .use(createServer(s));
