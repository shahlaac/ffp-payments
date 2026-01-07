import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, AfterLoad } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { PaymentStatus } from "./enums/status.enum";

@Entity({ name: 'client_payment' })
export class ClientPayment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name : 'client_id'})
    clientId: string;

    @Column({name :'order_id'})
    orderId: number;

    @Column({name:'payment_id'})
    paymentId: string;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
    })
    status: PaymentStatus;

    @Column('json', { nullable: true })
    response: any;

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