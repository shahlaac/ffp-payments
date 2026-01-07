import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, AfterLoad } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { AppCode } from "./enums/app-code.enum";
import { Status } from "./enums/status.enum";
import { UserType } from "./enums/user-type.enum";

@Entity({ name: 'client_user' })
export class ClientUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    clientId: string;

    @Column()
    clientSecret: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    clientName: string;

    @IsNotEmpty({ always: true })
    @Column({ name: 'mobile_no', length: 50 })
    mobileNo: string;

    @Column({ name: 'email_id', nullable: true })
    emailId: string;

    @Column({ type: 'enum', enum: Status, default: Status.Active })
    status: Status;

    @IsNotEmpty({ always: true })
    @Column({ name: 'app_code', type: 'enum', enum: AppCode })
    appCode: string;

    @Column({ name: 'role', type: 'enum', enum: UserType, default: UserType.Appuser })
    role: string;

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