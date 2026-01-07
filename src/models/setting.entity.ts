import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, Unique, UpdateDateColumn, DeleteDateColumn,ManyToOne, JoinColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import TransformDate from "../utilities/transformation/date.transform";
import { AppCode } from "./enums/app-code.enum";
import { Status } from "./enums/status.enum";
// import { User } from './user.entity';

@Unique(["appCode", "name"])

@Entity({ name: 'settings'})
export class Setting {
    @PrimaryGeneratedColumn() 
    id: number;
    
    @IsNotEmpty({always: true})
    @Column({name: 'app_code', type: 'enum', enum: AppCode})
    appCode: string;

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
   
    @Column({ name: 'created_by',  nullable: true})
    createdBy: number;

    @CreateDateColumn({ name: 'created_date', type: 'timestamp', update: false})
    @TransformDate()
    createdDate: Date;

    @Column({ name: 'updated_by', nullable: true})
    updatedBy: number;

    @UpdateDateColumn({ name: 'updated_date', type: 'timestamp', nullable: true})
    @TransformDate()
    updatedDate: Date;

    @Column({ name: 'deleted_by', nullable: true})
    deletedBy: number;

    @DeleteDateColumn({ name: 'deleted_date', type: 'timestamp', nullable: true})
    deletedDate: Date;

    // @ManyToOne(type => User)
    // @JoinColumn({ name: 'created_by'})
    // createdByUser: User;

    // @ManyToOne(type => User)
    // @JoinColumn({ name: 'updated_by'})
    // updatedByUser: User;
}
