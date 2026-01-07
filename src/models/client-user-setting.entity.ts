import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, AfterLoad } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Status } from "./enums/status.enum";

@Entity({ name: 'client_settings' })
export class ClientSettings {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'client_id' })
    clientId: string;

    @IsNotEmpty({always: true})
    @Column({name: 'display_name', nullable: true})
    displayName: string;

    @IsNotEmpty({always: true})
    @Column({name: 'name', nullable: true})
    name: string;

    @Column({type: "text"})
    data: string ;

    @Column({ type: 'enum', enum: Status, default: Status.Active})
    status: Status;

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