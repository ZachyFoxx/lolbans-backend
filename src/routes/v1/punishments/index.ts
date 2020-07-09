import { Router } from "express";

import { RH } from "../../types";
import { details } from "./details";
import { search } from "./search";

/**
 * Endpoint for handling punishment data.
 * @param server
 */
export const punishments: RH = (s) =>
    Router()
        .get("/", search(s))
        .get("/:id", details(s));
