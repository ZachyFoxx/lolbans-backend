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
    id!: number;

    // IP Length is not consistent ;w;
    @Column({ length: 49 })
    IPAddress!: string;
    @Column({ type: "text", nullable: true })
    Reason?: string;

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

    @Column({ length: 20 })
    PunishID!: string;
    @Column({ type: "timestamp" })
    TimeAdded!: Date;
    @Column({ type: "timestamp", nullable: true })
    Expiry?: Date;
}
