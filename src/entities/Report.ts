/**
 * CREATE TABLE IF NOT EXISTS Reports (
 * id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 * PlaintiffUUID varchar(36) NOT NULL,
 * PlaintiffName varchar(17) NOT NULL,
 * DefendantUUID varchar(36) NOT NULL,
 * DefendantName varchar(17) NOT NULL,
 * Reason TEXT NOT NULL,
 * JudgeUUID varchar(36) NULL,
 * JudgeName varchar(17) NULL,
 * Type varchar(32) NOT NULL,
 * CloseReason TEXT NULL,
 * Closed boolean DEFAULT FALSE NOT NULL,
 * TimeAdded TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 * PunishID varchar(20) NOT NULL
 */

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
