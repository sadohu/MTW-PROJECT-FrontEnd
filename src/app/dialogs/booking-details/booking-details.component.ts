import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SwalCustoms } from 'src/app/Utils/SwalCustoms';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})

export class BookingDetailsComponent implements OnInit {
  booking: Booking = {};


  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private bookingService: BookingService) {

  }

  ngOnInit(): void {
    if (!this.data.idBooking) {
      SwalCustoms.error("No se ha encontrado el id de la reserva");
      this.router.navigate(['booking']);
    }

    if (this.data.idBooking <= 0) {
      SwalCustoms.error("El id de la reserva es inválido");
      this.router.navigate(['booking']);
    }

    // TODO: Cambiar por el servicio de booking
    this.booking = {
      idBooking: this.data.idBooking,
      date: this.data.date,
      time: this.data.time,
      company: { businessName: this.data.company },
      applicant: this.data.applicant,
      area: { name: this.data.area },
      passenger: { names: this.data.passenger },
      ubigeoPickUp: { name: this.data.ubigeoPickUp },
      ubigeoDestination: { name: this.data.ubigeoDestination },
      notes: this.data.notes,
      currency: { name: this.data.currency },
      price: this.data.price,
      driver: { names: this.data.driver },
      status: this.data.status,
      bill: {}
    }

    console.log("this.booking", this.booking);

    // this.bookingService.getById(this.data.idBooking).subscribe({
    //   next: (response: Booking) => {
    //     this.booking = response;
    //     console.log("this.booking", this.booking);
    //   },
    //   error: (error: any) => {
    //     SwalCustoms.error(error.message);
    //     this.router.navigate(['booking']);
    //   }
    // })

  }
}
