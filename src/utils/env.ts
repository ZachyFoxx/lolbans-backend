/**
 * Current package version.
 */
export const VERSION = "1.0.0";

export const NODE_ENV = process.env.NODE_ENV
    ? process.env.NODE_ENV == "production"
        ? "production"
        : "development"
    : "development";

export const API_PORT = Number(process.env.API_PORT || 3000);
