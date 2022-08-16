import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { Driver } from './driver.entity';

@Entity({ name: "driver_bookings" })
export class DriverBooking {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ name: "total_rides" })
    totalRides: number;

    @Column()
    rating: number;

    @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
    
    @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToOne(() => Driver, driver => driver.booking)
    @JoinColumn()
    driver: Driver;
}
