import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { CustomerBooking } from './customer_booking.entity';
import { CustomerLocation } from './customer_location.entity';

@Entity({ name: "customers" })
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: false })
    deleted: boolean = false;

    @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
    
    @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToOne(() => CustomerBooking, booking => booking.customer)
    booking: CustomerBooking;

    @OneToMany(() => CustomerLocation, locations => locations.customer)
    locations: CustomerLocation[];
}
