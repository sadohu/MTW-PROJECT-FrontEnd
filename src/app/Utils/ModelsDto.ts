import { Booking } from "../models/booking.model";
import { BookingDto } from "./modelsDto/booking-dto.model";

export class ClientDocument {
    idDocumentType?: number;
    description?: string;
    apiDescription?: string;
}

export const listClientDocument: ClientDocument[] = [
    { idDocumentType: 1, description: 'DNI', apiDescription: 'dni' },
    { idDocumentType: 2, description: 'RUC', apiDescription: 'ruc' },
]

export const setListBookingToDto = (list: Booking[]) => {
    const listDto: BookingDto[] = [];
    list.forEach(item => {
        const dto = new BookingDto();
        dto.idBooking = item.idBooking;
        dto.date = item.date;
        dto.time = item.time;
        dto.company = item.company?.businessName;
        dto.applicant = item.applicant;
        dto.area = item.area?.name;
        dto.passenger = item.passenger?.names + ' ' + item.passenger?.lastNames;
        dto.pickUp = item.pickUp;
        dto.ubigeoPickUp = item.ubigeoPickUp?.name;
        dto.destination = item.destination;
        dto.ubigeoDestination = item.ubigeoDestination?.name;
        dto.notes = item.notes;
        dto.currency = item.currency?.symbol;
        dto.price = item.price;
        dto.driver = item.driver?.names + ' ' + item.driver?.lastNames;
        dto.status = item.status;
        dto.bill = item.bill?.number;
        listDto.push(dto);
    });
    return listDto;
}
