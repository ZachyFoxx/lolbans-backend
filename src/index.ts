import "reflect-metadata";

import dotenv from "dotenv";

import { ApiServer } from "./ApiServer";
import { NODE_ENV, VERSION } from "./utils/env";

// If development, load .env
if (NODE_ENV == "development") {
    const res = dotenv.config();
    if (res.error) {
        throw res.error;
    }
}

console.log(`\nlolbans-api v${VERSION} - NODE_ENV=${NODE_ENV}`);
console.log("made with 💜 by skye\n");

const server = new ApiServer();
server.listen();
