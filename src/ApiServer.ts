import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { createServer, Server } from "http";
import morgan from "morgan";
import { Connection, createConnection, getConnectionOptions } from "typeorm";

import { notFound } from "./errors";
import { registerRoutes } from "./routes";
import { API_PORT } from "./utils/env";
import { createLogger, QueryLogger } from "./utils/logging";

/**
 * API server - wraps express and http, routing requests to where they should be~
 */
export class ApiServer {
    readonly logger = createLogger("lolbans");
    readonly app = express();

    http: Server;
    connection: Connection;

    private start = Date.now();

    constructor() {
        this.logger.level = process.env.API_LOGLEVEL
            ? process.env.API_LOGLEVEL
            : "info";

        this.setupApp();
        this.setupHttpServer();
    }

    /**
     * Starts the server listening for connections.
     */
    async listen() {
        this.app.use("*", notFound);
        await this.setupDatabase();
        this.http.listen(API_PORT);
        this.logger.verbose(`Initialization took ${Date.now() - this.start}ms`);
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
                        write: (str) => this.logger.http(str.replace("\n", "")),
                    },
                })
            )
            .use(bodyParser.json());

        // Security middleware.
        if (process.env.NODE_ENV == "production") {
            this.logger.debug("Attaching security middleware...");
            this.app.use(helmet());
        }

        this.logger.debug("Setting up API routes...");
        registerRoutes(this);
    }

    /**
     * Set up HTTP server - if manual SSL needs to be done, do it here.
     */
    setupHttpServer() {
        this.http = createServer(this.app)
            .on("listening", () =>
                this.logger.info(`Listening on port ${API_PORT}`)
            )
            .on("error", (err) => this.logger.error(err));
    }

    /**
     * Connect to MySQL.
     */
    async setupDatabase() {
        this.logger.debug("Connecting to database...");
        try {
            this.connection = await getConnectionOptions().then((opts) => {
                return createConnection({
                    ...opts,
                    logger: new QueryLogger("all"),
                });
            });

            // this.logger.verbose("Synchronizing database...");
            // await this.connection.synchronize();
        } catch (err) {
            this.logger.error(err);
            this.logger.error(
                "Failed to connect to database - cannot finish initialization."
            );
            process.exit(1);
        }
    }
}
