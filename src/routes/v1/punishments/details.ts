import { Equal } from "typeorm";

import { Punishment } from "../../../entities/Punishment";
import { badRequest } from "../../../errors";
import { RH } from "../../types";

/**
 * Route for fetching punishment details by id.
 * @param server
 */
export const details: RH = (server) => async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return badRequest(req, res);
    }

    const where = !isNaN(Number(id))
        ? { id: Equal(Number(id)) }
        : { PunishID: Equal(id) };

    const data = await server.connection.getRepository(Punishment).findOne({
        where,
    });

    return res.json(data || null);
};
