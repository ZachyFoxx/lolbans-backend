import { Request, Response } from "express";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { Equal, LessThanOrEqual } from "typeorm";

import { ApiServer } from "../ApiServer";
import { Punishment, PunishType } from "../entities/Punishment";
import { badRequest } from "../errors";

const moment = extendMoment(Moment);

/**
 * Deals with graphed statistics.
 * @param server
 */
export const statisticsTimed = (server: ApiServer) => async (
    req: Request,
    res: Response
) => {
    const start = req.query.start
        ? moment.default(req.query.start as string)
        : moment.default().subtract(6, "days");

    const end = req.query.end
        ? moment.default(req.query.end as string)
        : moment.default();

    // bad >:C
    if (end.isSameOrBefore(start)) {
        return badRequest(req, res);
    }

    const data = [];
    const range = moment.range(start, end);
    const repo = server.connection.getRepository(Punishment);

    for (const m of range.by("day", { excludeEnd: false })) {
        const date = m.toDate();
        const [bans, kicks, mutes, warns] = await Promise.all([
            repo.count({
                where: {
                    Type: Equal(PunishType.Ban),
                    TimePunished: LessThanOrEqual(date),
                },
            }),
            repo.count({
                where: {
                    Type: Equal(PunishType.Kick),
                    TimePunished: LessThanOrEqual(date),
                },
            }),
            repo.count({
                where: {
                    Type: Equal(PunishType.Mute),
                    TimePunished: LessThanOrEqual(date),
                },
            }),
            repo.count({
                where: {
                    Type: Equal(PunishType.Warn),
                    TimePunished: LessThanOrEqual(date),
                },
            }),
        ]);

        data.push({
            date,
            bans,
            kicks,
            mutes,
            warns,
            total: bans + kicks + mutes + warns,
        });
    }

    return res.json(data);
};
