import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BookingSaveComponent } from 'src/app/components/booking-save/booking-save.component';
import { Driver } from 'src/app/models/driver.model';

@Component({
  selector: 'app-driver-search',
  templateUrl: './driver-search.component.html',
  styleUrls: ['./driver-search.component.css']
})

export class DriverSearchComponent {
  filter: string = "";
  dataSource: any;


  displayedColumns = ["names", "lastNames", "idNumber", "phone", "brand", "model", "carPlate", "year", "color", "actions"];

  constructor(private dialogRef: MatDialogRef<BookingSaveComponent>) {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  selectDriver(driver: Driver) {

  }
}
