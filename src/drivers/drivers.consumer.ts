import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "src/kafka/consumer.service";
import { DriversService } from "./drivers.service";
import { CreateDriverDto } from "./dto/create-driver.dto";
import { DriverPayload } from "./dto/driver-paload.dto";

@Injectable()
export class DriversConsumer implements OnModuleInit {
    private readonly CONSUMER_GROUP_PREFIX = "drivers";
    private readonly DRIVER_TOPICS = ["drivers"];
    constructor(private readonly consumerService: ConsumerService,
        private readonly driversService: DriversService) {}

    async onModuleInit() {
        await this.consumerService.consume({ topics: this.DRIVER_TOPICS }, this.CONSUMER_GROUP_PREFIX, {
            eachMessage:async ({ message }) => {
                const payload: string = message.value.toString('utf-8');
                const driverPayload: DriverPayload = JSON.parse(payload);
                await this.processData(driverPayload);
            }
        })
    }

    async processData(data: DriverPayload) {
        try {
            const createDriver: CreateDriverDto = new CreateDriverDto();
            createDriver.id = data.id;
            createDriver.name = data.name;
            createDriver.latitude = data.locationLatitude;
            createDriver.longitude = data.locationLongitude;
            createDriver.totalRides = data.numberOfRides;
            createDriver.rating = data.rating;
            // create driver
            await this.driversService.create(createDriver);
        } catch (error) {
            
        }
    }
}