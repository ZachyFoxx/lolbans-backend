import "reflect-metadata";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * "CREATE TABLE IF NOT EXISTS Users "
  +"(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,"
  +"UUID VARCHAR(36) NOT NULL,"
  +"PlayerName VARCHAR(17),"
  +"IPAddress VARCHAR(48) NOT NULL,"
  +"Country VARCHAR(64) NOT NULL,"
  +"CountryCode VARCHAR(3) NOT NULL,"
  +"FirstLogin TIMESTAMP NOT NULL,"
  +"LastLogin TIMESTAMP NOT NULL,"
  +"Punishments INT NULL,"
  +"LastPunished TIMESTAMP NULL,"
  +"TimesConnected INT NULL"
  +")").execute();
 */

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

    @Column({ type: "timestamp" })
    FirstLogin: Date;
    @Column({ type: "timestamp" })
    LastLogin: Date;

    @Column({ nullable: true })
    Punishments?: number;
    @Column({ type: "timestamp", nullable: true })
    LastPunished?: Date;

    @Column({ nullable: true })
    TimesConnected?: number;
}
