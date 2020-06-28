import { Router } from "express";

import { RH } from "../../types";
import { statistics } from "./statistics";
import { statisticsTimed } from "./statisticsTimed";

/**
 * Get punishment statistics
 * @param s
 */
export const stats: RH = (s) =>
    Router()
        .get("/", statistics(s))
        .get("/TimedTotalStats", statisticsTimed(s));
