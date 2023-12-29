import { Area } from "./area.model";
import { Bill } from "./bill.model";
import { Company } from "./company.model";
import { Currency } from "./currency.model";
import { Driver } from "./driver.model";
import { Passenger } from "./passenger.model";
import { Ubigeo } from "./ubigeo.model";

export class Booking {
    idBooking?: number;
    date?: Date;
    time?: Date;
    company?: Company;
    applicant?: string;
    area?: Area;
    passenger?: Passenger;
    pickUp?: string;
    ubigeoPickUp?: Ubigeo;
    destination?: string;
    ubigeoDestination?: Ubigeo;
    notes?: string;
    currency?: Currency;
    price?: number;
    driver?: Driver;
    status?: string;
    bill?: Bill;
}
