import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { Equal, LessThanOrEqual } from "typeorm";

import { Punishment, PunishType } from "../../../entities/Punishment";
import { badRequest } from "../../../errors";
import { RH } from "../../types";

const moment = extendMoment(Moment);

/**
 * Deals with graphed statistics.
 * @param server
 */
export const statisticsTimed: RH = (server) => async (req, res) => {
    const start = req.query.start
        ? moment.default.unix(
              (isNaN(Number(req.query.start))
                  ? Date.now()
                  : Number(req.query.start)) / 1000
          )
        : moment.default().subtract(6, "days");

    const end = req.query.end
        ? moment.default.unix(
              (isNaN(Number(req.query.end))
                  ? Date.now()
                  : Number(req.query.end)) / 1000
          )
        : moment.default();

    // bad >:C
    if (end.isSameOrBefore(start, "days")) {
        server.logger.debug(
            "Rejecting request - start date is after end date."
        );
        return badRequest(req, res);
    }

    const data = [];
    const range = moment.range(start, end);

    if (range.diff("days") > 30) {
        server.logger.debug(
            `Rejecting request - exceeds maximum date difference (${range.diff(
                "days"
            )}).`
        );
        return badRequest(req, res);
    }

    const repo = server.connection.getRepository(Punishment);

    // Find a way to speed this up without overloading the database.
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

    server.logger.debug(`Pulled ${data.length} dates.`);

    return res.json(data);
};
