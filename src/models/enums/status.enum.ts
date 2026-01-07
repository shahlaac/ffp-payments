export enum Status {
    Active = 1,
    InActive = -1,
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    FAILED = 'FAILED',
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    SUCCEEDED = 'SUCCESS',
    CANCELLED = 'CANCELLED',
    FAILED = 'FAILED',
}