import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum PunishType {
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
    AppealTime?: Date;
    Appealed: boolean;

    WarningACK: boolean;
}

@Entity({ name: "Punishments" })
export class Punishment implements PunishmentData {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 36 })
    UUID!: string;
    @Column({ length: 17 })
    PlayerName!: string;
    @Column({ length: 48 })
    IPAddress!: string;
    @Column({ type: "text" })
    Reason?: string;

    @Column({ length: 20 })
    PunishID!: string;
    @Column()
    Type!: PunishType;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    TimePunished!: Date;
    @Column({ type: "timestamp", nullable: true })
    Expiry?: Date;

    @Column({ length: 17 })
    ArbiterName!: string;
    @Column({ length: 36 })
    ArbiterUUID!: string;

    @Column({ type: "text", nullable: true })
    AppealReason?: string;
    @Column({ length: 17, nullable: true })
    AppelleeName?: string;
    @Column({ length: 36, nullable: true })
    AppelleeUUID?: string;
    @Column({ type: "timestamp", nullable: true })
    AppealTime?: Date;
    @Column("bool", { default: false })
    Appealed!: boolean;

    @Column("bool", { default: false })
    WarningACK!: boolean;
}
