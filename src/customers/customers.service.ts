import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomerBooking } from './entities/customer_booking.entity';
import { CustomerLocation } from './entities/customer_location.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,

    @InjectRepository(CustomerLocation)
    private readonly customerLocationRepo: Repository<CustomerLocation>,

    @InjectRepository(CustomerBooking)
    private readonly customerBookingRepo: Repository<CustomerBooking>,
    ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer: Customer = new Customer();
    customer.id = createCustomerDto.id;
    customer.name = createCustomerDto.name;
    await this.customerRepo.save(customer);

    const customerLoc: CustomerLocation = new CustomerLocation();
    customerLoc.customer = customer;
    customerLoc.latitude = createCustomerDto.latitude;
    customerLoc.longitude = createCustomerDto.longitude;

    const customerBooking: CustomerBooking = new CustomerBooking();
    customerBooking.customer = customer;
    customerBooking.totalRides = createCustomerDto.totalRides;
    customerBooking.rating = createCustomerDto.rating;
    return Promise.all([this.customerLocationRepo.save(customerLoc), this.customerBookingRepo.save(customerBooking)]);
  }

  findAll() {
    return this.customerRepo
    .createQueryBuilder("customer")
    .leftJoinAndSelect("customer.booking", "booking")
    .leftJoinAndSelect("customer.locations", "locations")
    .getMany();
  }

  async findOne(id: number) {
    return this.customerRepo
    .createQueryBuilder("customer")
    .leftJoinAndSelect("customer.booking", "booking")
    .leftJoinAndSelect("customer.locations", "locations")
    .where("customer.id = :id", { id })
    .getOne();
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
