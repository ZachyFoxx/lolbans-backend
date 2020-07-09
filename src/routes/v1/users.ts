import { Request, Response } from "express";
import { Equal } from "typeorm";

import { User } from "../../entities/User";
import { badRequest } from "../../errors";
import { RH } from "../types";

/**
 * Route for fetching user details by id.
 * @param server
 */
export const users: RH = (server) => async (req, res) => {
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
