import "reflect-metadata";

import { Request } from "express";
import { Column, Entity, PrimaryColumn } from "typeorm";

type InfractionType = "warn" | "mute" | "tempmute" | "ban";

export interface InfractionData {
    // add as required
    id: number;
    type: "warn" | "mute" | "tempmute" | "ban";
    user: string;
    moderator: string;
    duration: number;
}

@Entity()
export class Infraction implements InfractionData {
    @PrimaryColumn()
    public id: number;
    @Column()
    public type: InfractionType;
    @Column()
    public user: string;
    @Column()
    public moderator: string;
    @Column()
    public duration: number;

    constructor(
        id: number,
        type: InfractionType,
        user: string,
        moderator: string,
        duration = -1
    ) {
        this.id = id;
        this.type = type;
        this.user = user;
        this.moderator = moderator;
        this.duration = duration;
    }
    /**
     * Create a new infraction entitry from a post request.
     * @param req
     */
    static fromPostRequest = (req: Request) => {
        if (req.method != "POST") {
            return;
        }

        // Ensure all fields are filled.
        for (const k of ["id", "type", "user", "duration"]) {
            if (!req.body[k]) {
                return;
            }
        }

        const data = req.body as InfractionData;
        return new Infraction(
            data.id,
            data.type,
            data.user,
            data.moderator,
            data.duration
        );
    };
}
