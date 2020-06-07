import { Connection } from "typeorm";
import { isUndefined } from "util";

import { Punishment, PunishType } from "../entities/Punishment";
import { Report } from "../entities/Report";
import { User } from "../entities/User";

interface Arbiter {
    UUID: string;
    Name: string;
    Amount: number;
}

interface TotalStatistics {
    Total: number;
    PlayersPunished: number;
    UniqueConnections: number;
    PercentPunished: number;
    Reports: number;
    PunishmentArbiters: Arbiter[];
}

interface BanStatistics {
    ActiveBans: number;
    UnBans: number;
    TotalBans: number;
    BanArbiters: Arbiter[];
    PercentTotal: number;
}

interface KickStatistics {
    TotalKicks: number;
    KickArbiters: Arbiter[];
    PercentTotal: number;
}

interface MuteStatistics {
    ActiveMutes: number;
    UnMutes: number;
    TotalMutes: number;
    MuteArbiters: Arbiter[];
    PercentTotal: number;
}

interface WarnStatistics {
    ActiveWarns: number;
    Acknowledged: number;
    TotalWarns: number;
    WarnArbiters: Arbiter[];
    PercentTotal: number;
}

interface Statistics {
    TotalStats: TotalStatistics;
    BanStats: BanStatistics;
    KickStats: KickStatistics;
    MuteStats: MuteStatistics;
    WarnStats: WarnStatistics;
}

/**
 * Cached statistics.
 */
let cachedStatistics: Statistics | undefined;

/**
 * When stats were last computed.
 */
let lastRetrieved = -1;

/**
 * How long the cache should live for. Defaults to 5 minutes.
 */
const lifetime = (Number(process.env.API_CACHE_LIFETIME) || 5) * 60e3;

/**
 * Compute statistics - THIS MIGHT BE VERY MEMORY INTENSIVE.
 * @param conn
 */
const computeStatistics = async (conn: Connection): Promise<Statistics> => {
    const punishRepo = conn.getRepository(Punishment);

    const [Total, UniqueConnections, Reports] = await Promise.all([
        punishRepo.count(),
        await conn.getRepository(User).count(),
        await conn.getRepository(Report).count(),
    ]);

    // Only deal with 1000 punishments at a time to stop memory overload.
    const playersPunished = new Set<string>();

    // Bans
    let ActiveBans = 0;
    let UnBans = 0;
    const banArbiters: { [x: string]: Arbiter } = {};

    // Kicks
    let TotalKicks: number;
    const kickArbiters: { [x: string]: Arbiter } = {};

    // Mutes
    let ActiveMutes = 0;
    let UnMutes = 0;
    const muteArbiters: { [x: string]: Arbiter } = {};

    // Warns
    let ActiveWarns = 0;
    let Acknowledged = 0;
    const warnArbiters: { [x: string]: Arbiter } = {};

    for (let page = 0; page < Math.ceil(Total / 1000); page++) {
        const punishments = await punishRepo
            .createQueryBuilder("limit")
            .skip(page * 1000)
            .take(1000)
            .getMany();

        punishments.forEach((v) => {
            playersPunished.add(v.UUID);

            // Bans
            if (v.Type == PunishType.Ban) {
                if (v.Appealed) {
                    UnBans += 1;
                } else {
                    ActiveBans += 1;
                }
                // Arbiters
                if (!banArbiters[v.UUID]) {
                    banArbiters[v.UUID] = {
                        Amount: 0,
                        Name: v.ArbiterName,
                        UUID: v.ArbiterUUID,
                    };
                }
                banArbiters[v.UUID].Amount += 1;
            }

            // Kicks
            if (v.Type == PunishType.Kick) {
                TotalKicks += 1;
                // Arbiters
                if (!kickArbiters[v.UUID]) {
                    kickArbiters[v.UUID] = {
                        Amount: 0,
                        Name: v.ArbiterName,
                        UUID: v.ArbiterUUID,
                    };
                }
                kickArbiters[v.UUID].Amount += 1;
            }

            // Mutes
            if (v.Type == PunishType.Mute) {
                if (v.Appealed) {
                    UnMutes += 1;
                } else {
                    ActiveMutes += 1;
                }
                // Arbiters
                if (!muteArbiters[v.UUID]) {
                    muteArbiters[v.UUID] = {
                        Amount: 0,
                        Name: v.ArbiterName,
                        UUID: v.ArbiterUUID,
                    };
                }
                muteArbiters[v.UUID].Amount += 1;
            }

            // Warns
            if (v.Type == PunishType.Warn) {
                if (v.WarningACK) {
                    Acknowledged += 1;
                } else {
                    ActiveWarns += 1;
                }
                // Arbiters
                if (!warnArbiters[v.UUID]) {
                    warnArbiters[v.UUID] = {
                        Amount: 0,
                        Name: v.ArbiterName,
                        UUID: v.ArbiterUUID,
                    };
                }
                warnArbiters[v.UUID].Amount += 1;
            }
        });
    }

    // Compute arbiters
    // Todo: See if there's a more efficient way of doing this.
    const arbiters: { [x: string]: Arbiter } = {};

    for (const arbiter in banArbiters) {
        if (!arbiters[arbiter]) {
            arbiters[arbiter] = {
                Amount: banArbiters[arbiter].Amount,
                Name: banArbiters[arbiter].Name,
                UUID: banArbiters[arbiter].UUID,
            };
        } else {
            arbiters[arbiter].Amount += 1;
        }
    }

    for (const arbiter in kickArbiters) {
        if (!arbiters[arbiter]) {
            arbiters[arbiter] = {
                Amount: kickArbiters[arbiter].Amount,
                Name: kickArbiters[arbiter].Name,
                UUID: kickArbiters[arbiter].UUID,
            };
        } else {
            arbiters[arbiter].Amount += 1;
        }
    }

    for (const arbiter in muteArbiters) {
        if (!arbiters[arbiter]) {
            arbiters[arbiter] = {
                Amount: muteArbiters[arbiter].Amount,
                Name: muteArbiters[arbiter].Name,
                UUID: muteArbiters[arbiter].UUID,
            };
        } else {
            arbiters[arbiter].Amount += 1;
        }
    }

    for (const arbiter in warnArbiters) {
        if (!arbiters[arbiter]) {
            arbiters[arbiter] = {
                Amount: warnArbiters[arbiter].Amount,
                Name: warnArbiters[arbiter].Name,
                UUID: warnArbiters[arbiter].UUID,
            };
        } else {
            arbiters[arbiter].Amount += 1;
        }
    }

    const PlayersPunished = playersPunished.size;

    return {
        TotalStats: {
            Total,
            UniqueConnections,
            Reports,
            PlayersPunished,
            PercentPunished: (PlayersPunished / UniqueConnections) * 100,
            PunishmentArbiters: Object.values(arbiters),
        },
        BanStats: {
            TotalBans: ActiveBans + UnBans,
            ActiveBans,
            UnBans,
            PercentTotal: ((ActiveBans + UnBans) / Total) * 100,
            BanArbiters: Object.values(banArbiters),
        },
        KickStats: {
            TotalKicks,
            PercentTotal: (TotalKicks / Total) * 100,
            KickArbiters: Object.values(kickArbiters),
        },
        MuteStats: {
            TotalMutes: ActiveBans + UnBans,
            ActiveMutes,
            UnMutes,
            PercentTotal: ((ActiveMutes + UnMutes) / Total) * 100,
            MuteArbiters: Object.values(muteArbiters),
        },
        WarnStats: {
            TotalWarns: ActiveWarns + Acknowledged,
            ActiveWarns,
            Acknowledged,
            PercentTotal: ((ActiveWarns + Acknowledged) / Total) * 100,
            WarnArbiters: Object.values(warnArbiters),
        },
    };
};

/**
 * Fetch statistics.
 */
export const fetchStats = async (conn: Connection) => {
    if (
        Date.now() - lastRetrieved < lifetime &&
        !isUndefined(cachedStatistics)
    ) {
        return cachedStatistics;
    }

    lastRetrieved = Date.now();

    cachedStatistics = await computeStatistics(conn);
    return cachedStatistics;
};
