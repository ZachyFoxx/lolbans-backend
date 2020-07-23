import { isUndefined } from "lodash";

if (isUndefined(process.env.NODE_ENV)) {
    process.env.NODE_ENV = "development";
}

/**
 * Current package version.
 */
export const VERSION = "1";

export const NODE_ENV = process.env.NODE_ENV
    ? process.env.NODE_ENV == "production"
        ? "production"
        : "development"
    : "development";

export const API_PORT = Number(process.env.API_PORT || 3000);
