import { Request, Response } from "express";

import { ApiServer } from "../ApiServer";
import { serverError } from "../errors";
import { fetchStats } from "../stats";

/**
 * Fetch punishment statistics.
 * @param server
 */
export const statistics = (server: ApiServer) => async (
    req: Request,
    res: Response
) => {
    try {
        return res.json(await fetchStats(server.connection));
    } catch (err) {
        server.logger.error("Failed to retrieve punishment statistics.");
        server.logger.error(err);

        return serverError(req, res);
    }
};
