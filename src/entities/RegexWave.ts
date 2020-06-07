import "reflect-metadata";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface RegexWaveData {
    id: number;

    Regex: string;

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

@Entity({ name: "RegexWaves" })
export class RegexWave implements RegexWaveData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Regex: string;

    @Column({ type: "text" })
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
