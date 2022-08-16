import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { Driver } from './entities/driver.entity';
import { DriverLocation } from './entities/driver_location.entity';
import { DriverBooking } from './entities/driver_booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversConsumer } from './drivers.consumer';
import { ConsumerService } from 'src/kafka/consumer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, DriverLocation, DriverBooking])],
  controllers: [DriversController],
  providers: [ConsumerService, DriversService, DriversConsumer]
})
export class DriversModule {}
