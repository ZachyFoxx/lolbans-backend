import { notImplemented } from "../../../errors";
import { RH } from "../../types";

/**
 * OAuth login route
 *
 * Redirects users to Discord, caching their API and generating
 * a state field which can be used to validate any authenticate
 * requests made to the API.
 */
export const login: RH = () => (req, res) => notImplemented(req, res);
