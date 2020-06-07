import "reflect-metadata";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

interface ReportData {
    id: number;

    PlaintiffUUID: string;
    PlaintiffName: string;

    DefendantUUID: string;
    DefendantName: string;

    Reason: string;

    JudgeUUID?: string;
    JudgeName?: string;

    Type: string;
    CloseReason?: string;
    Closed: boolean;

    TimeAdded: Date;
    PunishID: string;
}

@Entity({ name: "Reports" })
export class Report implements ReportData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 36 })
    PlaintiffUUID: string;
    @Column({ length: 17 })
    PlaintiffName: string;

    @Column({ length: 36 })
    DefendantUUID: string;
    @Column({ length: 17 })
    DefendantName: string;

    @Column({ type: "text" })
    Reason: string;

    @Column({ length: 36, nullable: true })
    JudgeUUID?: string;
    @Column({ length: 17, nullable: true })
    JudgeName?: string;

    @Column({ length: 32 })
    Type: string;
    @Column({ type: "text", nullable: true })
    CloseReason?: string;
    @Column("bool", { default: false })
    Closed: boolean;

    @Column({ type: "timestamp" })
    TimeAdded: Date;
    @Column({ length: 20 })
    PunishID: string;
}
