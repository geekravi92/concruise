import { Injectable, OnModuleInit } from "@nestjs/common";
import { CustomersService } from "src/customers/customers.service";
import { ConsumerService } from "src/kafka/consumer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { CustomerPayload } from "./dto/customer-payload.dto";

@Injectable()
export class CustomersConsumer implements OnModuleInit {
    private readonly CONSUMER_GROUP_PREFIX = "customers";
    private readonly CUSTOMER_TOPICS = ["customers"];
    constructor(private readonly consumerService: ConsumerService,
        private readonly customersService: CustomersService) {}

    async onModuleInit() {
        await this.consumerService.consume({ topics: this.CUSTOMER_TOPICS }, this.CONSUMER_GROUP_PREFIX, {
            eachMessage:async ({ message }) => {
                const payload: string = message.value.toString('utf-8');
                const customerPayload: CustomerPayload = JSON.parse(payload);
                await this.processData(customerPayload);
            }
        })
    }

    async processData(data: CustomerPayload) {
        try {
            const createCustomer: CreateCustomerDto = new CreateCustomerDto();
            createCustomer.id = data.id;
            createCustomer.name = data.name;
            createCustomer.latitude = data.locationLatitude;
            createCustomer.longitude = data.locationLongitude;
            createCustomer.totalRides = data.numberOfRides;
            createCustomer.rating = data.rating;
            // create customer
            await this.customersService.create(createCustomer);
        } catch (error) {
            
        }
    }
}