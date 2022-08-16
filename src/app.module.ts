import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { CustomersModule } from './customers/customers.module';
import { DriversModule } from './drivers/drivers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    KafkaModule, 
    CustomersModule, 
    DriversModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'concruise',
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
