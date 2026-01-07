import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, AfterLoad } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { AppCode } from "./enums/app-code.enum";

@Entity({ name: 'client_session' })
export class ClientSession {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    clientId: string;

    @Column()
    clientSecret: string;

    @Column()
    clientToken: string;

    @IsNotEmpty({ always: true })
    @Column({ name: 'app_code', type: 'enum', enum: AppCode })
    appCode: string;

    @Column({ name: 'created_by', nullable: true })
    createdBy: number;

    @CreateDateColumn({ name: 'created_date', type: 'timestamp', update: false })
    createdDate: Date;

    @Column({ name: 'updated_by', nullable: true })
    updatedBy: number;

    @UpdateDateColumn({ name: 'updated_date', type: 'timestamp', nullable: true })
    updatedDate: Date;

    @Column({ name: 'deleted_by', nullable: true })
    deletedBy: number;

    @DeleteDateColumn({ name: 'deleted_date', type: 'timestamp', nullable: true })
    deletedDate: Date;

}