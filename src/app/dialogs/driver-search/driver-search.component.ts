import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BookingSaveComponent } from 'src/app/components/booking-save/booking-save.component';

@Component({
  selector: 'app-driver-search',
  templateUrl: './driver-search.component.html',
  styleUrls: ['./driver-search.component.css']
})

export class DriverSearchComponent {

  constructor(private dialogRef: MatDialogRef<BookingSaveComponent>) {

  }
}
