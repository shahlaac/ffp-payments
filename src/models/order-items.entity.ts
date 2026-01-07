import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItems {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'order_id', type: 'varchar', length: 36 })
    orderId: string;

    @Column({ name: 'item_id', type: 'varchar', length: 36 })
    itemId: string;

    @Column({ name: 'item_name', type: 'varchar', length: 255 })
    itemName: string;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    unitPrice: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    totalPrice: number;

    @ManyToOne(type => Order)
    @JoinColumn({ name: 'id' })
    order: Order;

    @Column({ name: 'created_by', nullable: true })
    createdBy: number;

    @CreateDateColumn({ name: 'created_date', type: 'timestamp', update: false })
    createdDate: Date;

    @Column({ name: 'updated_by', nullable: true })
    updatedBy: number;

    @UpdateDateColumn({ name: 'updated_date', type: 'timestamp', nullable: true })
    updatedDate: Date;
}
