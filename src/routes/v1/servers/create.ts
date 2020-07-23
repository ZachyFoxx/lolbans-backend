import { Router } from "express";
import ratelimit from "express-rate-limit";

import { Server } from "../../../entities/Server";
import { ratelimited } from "../../../errors";
import { RH } from "../../types";

const limiter = ratelimit({ windowMs: 5 * 60e3, max: 1, handler: ratelimited });

/**
 * Create a new server.
 * @param s
 */
export const createServer: RH = (s) =>
    Router()
        .use(limiter)
        .post("/", async (req, res) => {
            const server = await Server.createServer(s, req, res);
            res.json({ token: server.id });
        });
