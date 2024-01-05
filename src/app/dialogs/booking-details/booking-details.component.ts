import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})

export class BookingDetailsComponent {

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("data", data);

  }
}
