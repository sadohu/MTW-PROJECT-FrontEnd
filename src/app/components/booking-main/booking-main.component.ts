import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BookingDetailsComponent } from 'src/app/dialogs/booking-details/booking-details.component';
import { DriverSearchComponent } from 'src/app/dialogs/driver-search/driver-search.component';
import { Booking } from 'src/app/models/booking.model';
import { Company } from 'src/app/models/company.model';
import { BookingService } from 'src/app/services/booking.service';
import { setListBookingToDto } from 'src/app/Utils/ModelsDto';
import { BookingDto } from 'src/app/Utils/modelsDto/booking-dto.model';
import { SwalCustoms } from 'src/app/Utils/SwalCustoms';

@Component({
  selector: 'app-booking-main',
  templateUrl: './booking-main.component.html',
  styleUrls: ['./booking-main.component.css']
})

export class BookingMainComponent implements OnInit {
  filter: string = "";
  dataSource: any;
  newDriver: any = { idDriver: 0 };
  company: Company = { idCompany: -1 };

  displayedColumns = ["idBooking", "date", "time", "company", "area", "passenger", "pickUp", "destination", "price", "driver", "status", "actions"];
  // , "applicant"
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private dialogService: MatDialog, private bookingService: BookingService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idCompany = params['id'];
      if (idCompany >= 0) {
        this.company.idCompany = idCompany;
        this.refreshTableByCompany();
      } else {
        this.refreshTable();
      }
    });
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

  refreshTableByCompany() {
    this.bookingService.getByCompany(this.company.idCompany!).subscribe({
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

  setBookingStatusToProceso(booking: Booking) {
    const message = `La reserva Nº ${booking.idBooking} pasará a estado "En proceso"`;

    SwalCustoms.confirm("¿Desea cambiar el estado de la reserva?", message).then((result: any) => {
      if (result) {
        booking.status = "En Proceso";
        console.log("booking", booking);

        // this.bookingService.updateStatus(booking).subscribe({
        //   next: (response: any) => {
        //     console.log("response", response);
        //     this.refreshTable();
        //   },
        //   error: (error: any) => {
        //     console.log(error);
        //   }
        // });
      }
    });
  }

  setBookingStatusToFinalizado(booking: Booking) {
    const message = `La reserva Nº ${booking.idBooking} pasará a estado "Finalizado"`;

    SwalCustoms.confirm("¿Desea cambiar el estado de la reserva?", message).then((result: any) => {
      if (result) {
        booking.status = "Finalizado";
        console.log("booking", booking);

        // this.bookingService.updateStatus(booking).subscribe({
        //   next: (response: any) => {
        //     console.log("response", response);
        //     this.refreshTable();
        //   },
        //   error: (error: any) => {
        //     console.log(error);
        //   }
        // });
      }
    });
  }

  openBookingDetailsDialog(booking: Booking) {
    const dialogRef = this.dialogService.open(BookingDetailsComponent, { data: booking });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }

}
