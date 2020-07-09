import { Router } from "express";

import { RH } from "../../types";
import { authorize } from "./authorize";
import { login } from "./login";

/**
 * OAuth router
 * @param s
 */
export const oauth: RH = (s) =>
    Router()
        .get("/login", login(s))
        .post("/authorize", authorize(s));
