import { Area } from "./area.model";
import { Bill } from "./bill.model";
import { Company } from "./company.model";
import { Driver } from "./driver.model";
import { Passenger } from "./passenger.model";
import { Ubigeo } from "./ubigeo.model";

export class Booking {
    idBooking?: number;
    date?: Date;
    time?: Date;
    company?: Company;
    area?: Area;
    passenger?: Passenger;
    pickUp?: string;
    distritPickUp?: Ubigeo;
    destination?: string;
    distritDestination?: Ubigeo;
    notes?: string;
    price?: number;
    driver?: Driver;
    status?: string;
    bill?: Bill;
}
