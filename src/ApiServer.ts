import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { createServer, Server } from "http";
import morgan from "morgan";
import { Connection, createConnection } from "typeorm";

import { notFound } from "./errors";
import { registerRoutes } from "./routes";
import { createLogger } from "./utils/logging";

export class ApiServer {
    readonly logger = createLogger("lolbans");
    readonly app = express();

    http: Server;
    connection: Connection;

    constructor() {
        this.logger.level = "debug";
        this.setupApp();
        this.setupHttpServer();
    }

    /**
     * Starts the server listening for connections.
     */
    async listen() {
        this.app.use("*", notFound);

        await this.setupDatabase();

        this.http.listen(3000);
    }

    /**
     * Set up sever middleware and routes.
     */
    setupApp() {
        this.logger.debug("Setting up middleware...");
        this.app
            .use(cors())
            .use(
                morgan("dev", {
                    stream: {
                        write: (str) =>
                            this.logger.verbose(str.replace("\n", "")),
                    },
                })
            )
            .use(bodyParser.json());

        this.logger.debug("Setting up API routes...");
        registerRoutes(this);
    }

    /**
     * Set up HTTP server - if manual SSL needs to be done, do it here.
     */
    setupHttpServer() {
        this.http = createServer(this.app)
            .on("listening", () => this.logger.info("Listening on port 3000"))
            .on("error", (err) => this.logger.error(err));
    }

    /**
     * Connect to MySQL.
     */
    async setupDatabase() {
        this.logger.debug("Connecting to database...");
        this.connection = await createConnection();
    }
}
