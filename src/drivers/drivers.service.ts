import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';
import { DriverLocation } from './entities/driver_location.entity';
import { DriverBooking } from './entities/driver_booking.entity';

@Injectable()
export class DriversService {
constructor(
  @InjectRepository(Driver)
  private readonly driverRepo: Repository<Driver>,

  @InjectRepository(DriverLocation)
  private readonly driverLocationRepo: Repository<DriverLocation>,

  @InjectRepository(DriverBooking)
  private readonly driverBookingRepo: Repository<DriverBooking>,
) {}

  async create(createDriverDto: CreateDriverDto) {
    const driver: Driver = new Driver();
    driver.id = createDriverDto.id;
    driver.name = createDriverDto.name;
    await this.driverRepo.save(driver);

    const driverLoc: DriverLocation = new DriverLocation();
    driverLoc.driver = driver;
    driverLoc.latitude = createDriverDto.latitude;
    driverLoc.longitude = createDriverDto.longitude;

    const driverBooking: DriverBooking = new DriverBooking();
    driverBooking.driver = driver;
    driverBooking.totalRides = createDriverDto.totalRides;
    driverBooking.rating = createDriverDto.rating;

    return Promise.all([this.driverLocationRepo.save(driverLoc), this.driverBookingRepo.save(driverBooking)]);
  }

  findAll() {
    return this.driverRepo
    .createQueryBuilder("driver")
    .leftJoinAndSelect("driver.booking", "booking")
    .leftJoinAndSelect("driver.locations", "locations")
    .getMany();
  }

  findOne(id: number) {
    return this.driverRepo
    .createQueryBuilder("driver")
    .leftJoinAndSelect("driver.booking", "booking")
    .leftJoinAndSelect("driver.locations", "locations")
    .where("driver.id = :id", { id })
    .getOne();
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
