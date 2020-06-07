import "reflect-metadata";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * CREATE TABLE IF NOT EXISTS Punishments"
 +"(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,"
 // Player info stuffs
 +"UUID VARCHAR(36) NOT NULL,"
 +"PlayerName VARCHAR(17) NOT NULL,"
 +"IPAddress VARCHAR(48) NOT NULL,"
 // (General punish info)
 +"Reason TEXT NULL,"
 +"PunishID VARCHAR(20) NOT NULL,"
 // 0 = Ban, 1 = Mute, 2 = Kick, 3 = Warn
 +"Type INT NOT NULL,"
 +"TimePunished TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,"
 +"Expiry TIMESTAMP NULL,"
 // Who banned (punshied) them
 +"ArbiterName VARCHAR(17) NOT NULL,"
 +"ArbiterUUID VARCHAR(36) NOT NULL,"
 // Who un-punished (appealed their punishment) them
 +"AppealReason TEXT NULL,"
 // Who has reviewed and approved/denied the appeal.
 +"AppelleeName VARCHAR(17) NULL,"
 +"AppelleeUUID VARCHAR(36) NULL,"
 +"AppealTime TIMESTAMP NULL,"
 // this will just make checking if they're banned or not easier...
 +"Appealed BOOLEAN DEFAULT FALSE,"
 // Used only when type == 3 for warnings.
 +"WarningAck BOOLEAN DEFAULT FALSE"
 +")
 */

enum PunishType {
    Ban,
    Mute,
    Kick,
    Warn,
}

export interface PunishmentData {
    // add as required
    id: number;
    UUID: string;
    PlayerName: string;
    IPAddress: string;
    Reason?: string;
    PunishID: string;
    Type: PunishType;

    TimePunished: Date;
    Expiry?: Date;

    ArbiterName: string;
    ArbiterUUID: string;

    AppealReason?: string;
    AppelleeName?: string;
    AppelleeUUID?: string;
    AppelleeTime?: Date;
    Appealed: boolean;

    WarningACK: boolean;
}

@Entity({ name: "Punishments" })
export class Punishment implements PunishmentData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 36 })
    UUID: string;
    @Column({ length: 17 })
    PlayerName: string;
    @Column({ length: 48 })
    IPAddress: string;
    @Column({ type: "text" })
    Reason?: string;

    @Column({ length: 20 })
    PunishID: string;
    @Column()
    Type: PunishType;

    @Column({ type: "timestamp" })
    TimePunished: Date;
    @Column({ type: "timestamp", nullable: true })
    Expiry?: Date;

    @Column({ length: 17 })
    ArbiterName: string;
    @Column({ length: 36 })
    ArbiterUUID: string;

    @Column({ type: "text", nullable: true })
    AppealReason?: string;
    @Column({ length: 17, nullable: true })
    AppelleeName?: string;
    @Column({ length: 36, nullable: true })
    AppelleeUUID?: string;
    @Column({ type: "timestamp", nullable: true })
    AppelleeTime?: Date;
    @Column("bool", { default: false })
    Appealed: boolean;

    @Column("bool", { default: false })
    WarningACK: boolean;
}
