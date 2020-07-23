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
    id!: number;

    @Column({ length: 36 })
    UUID!: string;
    @Column({ length: 17 })
    PlayerName!: string;
    @Column({ length: 48 })
    IPAddress!: string;

    @Column({ type: "text", nullable: true })
    Reason?: string;

    @Column({ length: 17 })
    ArbiterName!: string;
    @Column({ length: 36 })
    ArbiterUUID!: string;

    @Column({ length: 20 })
    PunishID!: string;
    @Column({ type: "timestamp" })
    TimePunished!: Date;
    @Column({ type: "timestamp", nullable: true })
    Expiry?: Date;
}
