import { notImplemented } from "../../../errors";
import { RH } from "../../types";

/**
 * OAuth authorize route
 *
 * Makes a post request to Discord to obtain the user's
 * access token, used for verifying identity.
 */
export const authorize: RH = () => (req, res) => notImplemented(req, res);
