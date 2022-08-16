import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { Customer } from './customer.entity';

@Entity({ name: "customer_locations" })
export class CustomerLocation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("decimal", { precision: 12, scale: 8 })
    latitude: number;

    @Column("decimal", { precision: 12, scale: 8 })
    longitude: number;

    @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
    
    @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @ManyToOne(() => Customer, customer => customer.locations)
    @JoinColumn()
    customer: Customer;
}
