import { createECDH, generateKeyPair, generateKeyPairSync } from "crypto";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
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

        const id = uuid();

        server.logger.verbose(
            `Generating public/private key pair for new server '${id}'...`
        );

        const keypair = generateKeyPairSync("ec", { namedCurve: "secp128r2" });

        server.logger.debug("Generated keypairs using ECDH curve secp128r2");

        const token = jwt.sign(
            { id },
            keypair.privateKey.export({ type: "sec1", format: "pem" }),
            {
                algorithm: "ES512",
            }
        );

        server.logger.debug(token);

        const decoded = jwt.verify(
            token,
            keypair.publicKey.export({ type: "pkcs1", format: "pem" })
        );

        server.logger.debug(decoded.toString());

        return new Server();
    }
}
