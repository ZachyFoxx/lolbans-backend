import { Request, Response } from "express";

import { ApiServer } from "../ApiServer";
import { Infraction } from "../entities/Infraction";
import { badRequest } from "../errors";

export const infractions = (server: ApiServer) => async (
    req: Request,
    res: Response
) => {
    const repo = server.connection.getRepository(Infraction);
    const count = await repo.count();

    if (req.query.p) {
        if (
            typeof req.query.p != "string" ||
            isNaN(parseInt(req.query.p as string)) ||
            parseInt(req.query.p as string) % 1 != 0
        ) {
            return badRequest(req, res);
        }

        const data = await repo
            .createQueryBuilder("paginator")
            .orderBy("paginator.id", "ASC")
            .skip((parseInt(req.query.p) - 1) * 50)
            .take(50)
            .getMany();

        return res.json(data);
    }

    return res.json({
        count,
        pages: Math.ceil(count / 50),
    });
};
