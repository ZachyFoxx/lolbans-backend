import { Router } from "express";

import { RH } from "../types";
import { punishments } from "./punishments";
import { stats } from "./stats";
import { users } from "./users";

/**
 * v1 API routes
 */
export const v1: RH = (s) =>
    Router()
        .use("/punishments", punishments(s))
        .get("/users/:uuid", users(s))
        .use("/statistics", stats(s));
