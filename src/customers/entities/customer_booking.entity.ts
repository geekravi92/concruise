import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { Customer } from './customer.entity';

@Entity({ name: "customer_bookings" })
export class CustomerBooking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "total_rides" })
    totalRides: number;

    @Column()
    rating: number;

    @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
    
    @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToOne(() => Customer, customer => customer.booking)
    @JoinColumn()
    customer: Customer;
}
