import "reflect-metadata";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface UserData {
    id: number;
    UUID: string;
    PlayerName: string;
    IPAddress: string;

    Country: string;
    CountryCode: string;

    FirstLogin: Date;
    LastLogin: Date;

    Punishments?: number;
    LastPunished?: Date;

    TimesConnected?: number;
}

@Entity({ name: "Users" })
export class User implements UserData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 36 })
    UUID: string;
    @Column({ length: 17 })
    PlayerName: string;
    @Column({ length: 48 })
    IPAddress: string;

    @Column({ length: 64 })
    Country: string;
    @Column({ length: 3 })
    CountryCode: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    FirstLogin: Date;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    LastLogin: Date;

    @Column({ nullable: true })
    Punishments?: number;
    @Column({ type: "timestamp", nullable: true })
    LastPunished?: Date;

    @Column({ nullable: true })
    TimesConnected?: number;
}
