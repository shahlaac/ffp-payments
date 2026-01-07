
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';
import { OrderStatus } from './enums/status.enum';

export interface OrderItemJson {
    productId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ name: 'client_id', type: 'varchar', length: 36 })
    clientId: string;

    @Index({ unique: true })
    @Column({ name: 'order_number', type: 'varchar', length: 50 })
    orderNumber: string;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    status: OrderStatus;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    subtotalAmount: number;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    taxAmount: number;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    shippingAmount: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    totalAmount: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    paymentMethod: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    paymentReference: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    paymentId: string;

    @Column({ type: 'json', name: 'order_items' })
    orderItems: OrderItemJson[];

    @Column({ name: 'created_by', nullable: true })
    createdBy: number;

    @CreateDateColumn({ name: 'created_date', type: 'timestamp', update: false })
    createdDate: Date;

    @Column({ name: 'updated_by', nullable: true })
    updatedBy: number;

    @UpdateDateColumn({ name: 'updated_date', type: 'timestamp', nullable: true })
    updatedDate: Date;
}
