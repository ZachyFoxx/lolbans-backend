import { Request, Response } from "express";
import { Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { ApiServer } from "../ApiServer";

/**
 * Represents a server.
 */
@Entity()
export class Server {
    @PrimaryColumn()
    id: string;

    constructor() {
        this.id = uuid();
    }

    /**
     * Create a new server entity.
     * @param server
     * @param req
     * @param res
     */
    static async createServer(server: ApiServer, req: Request, res: Response) {
        // Do some sort of cryptography here
        return new Server();
    }
}
