import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './entities/customer.entity';
import { CustomerLocation } from './entities/customer_location.entity';
import { CustomerBooking } from './entities/customer_booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersConsumer } from './customers.consumer';
import { ConsumerService } from 'src/kafka/consumer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerLocation, CustomerBooking])],
  controllers: [CustomersController],
  providers: [ConsumerService, CustomersService, CustomersConsumer]
})
export class CustomersModule {}
