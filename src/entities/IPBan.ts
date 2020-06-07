/**
 * CREATE TABLE IF NOT EXISTS IPBans"
  +"(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,"
  +"IPAddress varchar(49) NOT NULL,"
  +"Reason TEXT NULL,"
  +"ArbiterName varchar(17) NOT NULL,"
  +"ArbiterUUID VARCHAR(36) NOT NULL,"
  // Who un-punished (appealed their punishment) them
  +"AppealReason TEXT NULL,"
  // Who has reviewed and approved/denied the appeal.
  +"AppelleeName VARCHAR(17) NULL,"
  +"AppelleeUUID VARCHAR(36) NULL,"
  +"AppealTime TIMESTAMP NULL,"
  // this will just make checking if they're banned or not easier...
  +"Appealed BOOLEAN DEFAULT FALSE,"
  +"PunishID varchar(20) NOT NULL,"
  +"TimeAdded TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,"
  +"Expiry TIMESTAMP NULL"
  +")
 */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// No, i'm not doing what you think I am, ESLint grrr
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IPBanData {
    id: number;

    IPAddress: string;
    Reason?: string;

    ArbiterName: string;
    ArbiterUUID: string;

    AppealReason?: string;
    AppelleeName?: string;
    AppelleeUUID?: string;
    AppealTime?: Date;
    Appealed: boolean;

    PunishID: string;
    TimeAdded: Date;
    Expiry?: Date;
}

@Entity({ name: "IPBans" })
export class IPBan implements IPBanData {
    @PrimaryGeneratedColumn()
    id: number;

    // IP Length is not consistent ;w;
    @Column({ length: 49 })
    IPAddress: string;
    @Column({ type: "text", nullable: true })
    Reason?: string;

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
    AppealTime?: Date;
    @Column("bool", { default: false })
    Appealed: boolean;

    @Column({ length: 20 })
    PunishID: string;
    @Column({ type: "timestamp" })
    TimeAdded: Date;
    @Column({ type: "timestamp", nullable: true })
    Expiry?: Date;
}
