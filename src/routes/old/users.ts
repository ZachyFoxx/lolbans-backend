import { Request, Response } from "express";
import { Equal } from "typeorm";

import { ApiServer } from "../ApiServer";
import { User } from "../entities/User";
import { badRequest } from "../errors";

/**
 * Route for fetching user details by id.
 * @param server
 */
export const users = (server: ApiServer) => async (
    req: Request,
    res: Response
) => {
    const uuid = req.params.uuid;

    if (!uuid) {
        return badRequest(req, res);
    }

    const data = server.connection.getRepository(User).findOne({
        where: {
            UUID: Equal(uuid),
        },
    });

    return res.json(data || null);
};
