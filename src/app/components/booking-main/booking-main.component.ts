import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DriverSearchComponent } from 'src/app/dialogs/driver-search/driver-search.component';
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
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private dialogService: MatDialog, private bookingService: BookingService) {
    this.refreshTable();
  }

  applyFilter() {
    this.dataSource.filter = this.filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshTable() {
    this.bookingService.getAll().subscribe({
      next: (response: any) => {
        // console.log("response", response);
        const listDto = setListBookingToDto(response);
        // console.log("listDto", listDto);
        this.dataSource = new MatTableDataSource<BookingDto>(listDto);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  openDriverDialog(booking: Booking) {
    const dialogRef = this.dialogService.open(DriverSearchComponent, { data: booking });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log("result", result);
        // console.log("booking", booking);
        const newDriverToBooking = {
          idBooking: booking.idBooking,
          idDriver: result.idDriver
        }
        // TODO: Reemplazar por la nueva función de asignar conductor
        this.bookingService.save(newDriverToBooking).subscribe({
          next: (response: any) => {
            console.log("response", response);
            this.refreshTable();
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      }
    });
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
