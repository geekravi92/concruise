import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { DriverBooking } from './driver_booking.entity';
import { DriverLocation } from './driver_location.entity';

@Entity({ name: "drivers" })
export class Driver {
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

    @OneToOne(() => DriverBooking, booking => booking.driver)
    booking: DriverBooking;

    @OneToMany(() => DriverLocation, locations => locations.driver)
    locations: DriverLocation[];
}
