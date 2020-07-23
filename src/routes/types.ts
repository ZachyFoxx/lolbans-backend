import { RequestHandler } from "express";

import { ApiServer } from "../ApiServer";

/**
 * Server request handler factory type.
 */
export type RH = (server: ApiServer) => RequestHandler;
