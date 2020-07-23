import { Request, Response } from "express";
import { Equal } from "typeorm";

import { ApiServer } from "../../ApiServer";
import { Punishment } from "../../entities/servers/Punishment";
import { badRequest } from "../../errors";

/**
 * Route for fetching punishment details by id.
 * @param server
 */
export const punishDetails = (server: ApiServer) => async (
    req: Request,
    res: Response
) => {
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
