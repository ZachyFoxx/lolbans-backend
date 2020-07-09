import { serverError } from "../../../errors";
import { fetchStats } from "../../../stats";
import { RH } from "../../types";

/**
 * Fetch punishment statistics.
 * @param server
 */
export const statistics: RH = (server) => async (req, res) => {
    try {
        return res.json(await fetchStats(server.connection));
    } catch (err) {
        server.logger.error("Failed to retrieve punishment statistics.");
        server.logger.error(err);

        return serverError(req, res);
    }
};
