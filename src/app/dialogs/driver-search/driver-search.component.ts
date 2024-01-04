import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SwalCustoms } from 'src/app/Utils/SwalCustoms';
import { BookingSaveComponent } from 'src/app/components/booking-save/booking-save.component';
import { Booking } from 'src/app/models/booking.model';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-search',
  templateUrl: './driver-search.component.html',
  styleUrls: ['./driver-search.component.css']
})

export class DriverSearchComponent {
  filter: string = "";
  dataSource: any;
  booking: Booking = { idBooking: -1 };


  displayedColumns = ["names", "lastNames", "idNumber", "phone", "brand", "model", "carPlate", "year", "color", "actions"];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private dialogRef: MatDialogRef<BookingSaveComponent>, private driverService: DriverService, @Inject(MAT_DIALOG_DATA) public data: Booking) {
    this.booking = data;
    this.refreshTable();
  }

  private refreshTable() {
    this.driverService.getAll().subscribe({
      next: (response: Driver[]) => {
        this.dataSource = new MatTableDataSource<Driver>(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  selectDriver(driver: Driver) {
    const message = (this.booking.idBooking == -1)
      ? `El conductor ${driver.names} ${driver.lastNames} será asignado a la reserva`
      : `El conductor ${driver.names} ${driver.lastNames} será asignado a la reserva Nº ${this.booking.idBooking}`;

    SwalCustoms.confirm("¿Desea seleccionar al conductor?", message).then((result: any) => {
      if (result)
        this.dialogRef.close(driver);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
