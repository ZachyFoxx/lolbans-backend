import { Request, Response, Router } from "express";
import { isUndefined } from "util";

import { ApiServer } from "../ApiServer";
import { Punishment, PunishType } from "../entities/Punishment";
import { badRequest } from "../errors";
import { isPositiveInteger } from "../utils/checks";

/**
 * Endpoint for handling punishment data.
 * @param server
 */
export const punishments = (server: ApiServer) =>
    Router().get("/", async (req: Request, res: Response) => {
        const repo = server.connection.getRepository(Punishment);

        let page = 0;

        if (!isUndefined(req.query.page)) {
            if (!isPositiveInteger(req.query.page)) {
                return badRequest(req, res);
            }
            page = Number(req.query.page);
        }

        let type: PunishType | undefined;

        if (req.query.type) {
            if (
                !isPositiveInteger(req.query.type) ||
                Number(req.query.type) < 0
            ) {
                return badRequest(req, res);
            }
            type = Number(req.query.type);
        }

        const query = repo
            .createQueryBuilder("pagination")
            .orderBy("pagination.id", "ASC");

        if (!isUndefined(type)) {
            query.where("pagination.Type = :type", { type });
        }

        const data = await query
            .skip((page - 1) * 100)
            .take(100)
            .getMany();

        return res.json(data);
    });
