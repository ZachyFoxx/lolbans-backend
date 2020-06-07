/**
 * self.connection.prepareStatement("CREATE TABLE IF NOT EXISTS BanWave"
 +"(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,"
 +"UUID varchar(36) NOT NULL,"
 +"PlayerName varchar(17) NOT NULL,"
 +"IPAddress varchar(48) NOT NULL,"
 +"Reason TEXT NULL,"
 +"ArbiterName varchar(17) NOT NULL,"
 +"ArbiterUUID varchar(36) NOT NULL,"
 +"PunishID varchar(20) NOT NULL,"
 +"TimePunished TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,"
 +"Expiry TIMESTAMP NULL"
 +")").execute();
 */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface BanWaveData {
    id: number;

    UUID: string;
    PlayerName: string;
    IPAddress: string;

    Reason?: string;

    ArbiterName: string;
    ArbiterUUID: string;

    PunishID: string;
    TimePunished: Date;
    Expiry?: Date;
}

@Entity({ name: "BanWaves" })
export class BanWave implements BanWaveData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 36 })
    UUID: string;
    @Column({ length: 17 })
    PlayerName: string;
    @Column({ length: 48 })
    IPAddress: string;

    @Column({ type: "text", nullable: true })
    Reason?: string;

    @Column({ length: 17 })
    ArbiterName: string;
    @Column({ length: 36 })
    ArbiterUUID: string;

    @Column({ length: 20 })
    PunishID: string;
    @Column({ type: "timestamp" })
    TimePunished: Date;
    @Column({ type: "timestamp", nullable: true })
    Expiry?: Date;
}
