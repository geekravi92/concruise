import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { Driver } from './driver.entity';

@Entity({ name: "driver_locations" })
export class DriverLocation {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("decimal", { precision: 12, scale: 8 })
    latitude: number;

    @Column("decimal", { precision: 12, scale: 8 })
    longitude: number;

    @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
    
    @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @ManyToOne(() => Driver, driver => driver.locations)
    @JoinColumn()
    driver: Driver;
}
