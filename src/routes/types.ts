import { Handler } from "express";

import { ApiServer } from "../ApiServer";

/**
 * Request handler factory type.
 */
export type RH = (server: ApiServer) => Handler;
