import { Request, Response } from "express";
import { Equal } from "typeorm";

import { ApiServer } from "../ApiServer";
import { Punishment } from "../entities/Punishment";
import { badRequest } from "../errors";

/**
 * Route for fetching punishment details by id.
 * @param server
 */
export const punishDetails = (server: ApiServer) => async (
    req: Request,
    res: Response
) => {
    const PunishID = req.query.punishid;

    if (!PunishID) {
        return badRequest(req, res);
    }

    const data = server.connection.getRepository(Punishment).findOne({
        where: {
            PunishID: Equal(PunishID),
        },
    });

    return res.json(data || null);
};
