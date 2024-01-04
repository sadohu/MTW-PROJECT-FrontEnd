import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking.service';
import { setListBookingToDto } from 'src/app/Utils/ModelsDto';
import { BookingDto } from 'src/app/Utils/modelsDto/booking-dto.model';

@Component({
  selector: 'app-booking-main',
  templateUrl: './booking-main.component.html',
  styleUrls: ['./booking-main.component.css']
})

export class BookingMainComponent {
  filter: string = "";
  dataSource: any;
  newDriver: any = { idDriver: 0 };

  displayedColumns = ["idBooking", "date", "time", "company", "applicant", "area", "passenger", "pickUp", "destination", "price", "driver", "status", "actions"];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private bookingService: BookingService) {
    this.refreshTable();
  }

  applyFilter() {
    // const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshTable() {
    this.bookingService.getAll().subscribe({
      next: (response: any) => {
        console.log("response", response);
        const listDto = setListBookingToDto(response);
        console.log("listDto", listDto);
        this.dataSource = new MatTableDataSource<BookingDto>(listDto);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  openSaveDialog(driver: Booking) {
    // const dialogRef = this.dialogService.open(DriverSaveComponent, { data: driver });

    // dialogRef.afterClosed().subscribe(object => {
    //   if (object) {
    //     console.log(object);
    //   }
    // });
  }

  deleteDriver(item: Booking) {
    // this.driverService.delete(item.idDriver!).subscribe({
    //   next: (response: any) => {
    //     SwalCustoms.info("Eliminado correctamente");
    //     this.refreshTable();
    //   },
    //   error: (error: any) => {
    //     SwalCustoms.nyanAlert(error.message);
    //   }
    // })
  }

}
