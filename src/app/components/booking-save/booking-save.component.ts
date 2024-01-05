import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { format, parse } from 'date-fns';
import { SwalCustoms } from 'src/app/Utils/SwalCustoms';
import { DriverSearchComponent } from 'src/app/dialogs/driver-search/driver-search.component';
import { Area } from 'src/app/models/area.model';
import { Booking } from 'src/app/models/booking.model';
import { Company } from 'src/app/models/company.model';
import { Currency } from 'src/app/models/currency.model';
import { Driver } from 'src/app/models/driver.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { BookingService } from 'src/app/services/booking.service';
import { CompanyService } from 'src/app/services/company.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-booking-save ',
  templateUrl: './booking-save.component.html',
  styleUrls: ['./booking-save.component.css']
})

export class BookingSaveComponent implements OnInit {
  ubigeo: Ubigeo[] = [];
  drivers: Driver[] = [];
  areas: Area[] = [];
  currencies: Currency[] = [];
  company: Company = {};
  defaultCurrencySoles = 1;
  dateForm = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  // timeForm = formatDate(new Date(), 'HH:mm', 'en-US')
  timeForm = "00:00"
  mode = "";
  disableOptions = false;

  booking: Booking = {
    idBooking: -1,
    company: { idCompany: -1 },
    area: { idArea: -1 },
    passenger: { names: "", lastNames: "" },
    ubigeoPickUp: { idUbigeo: -1 },
    ubigeoDestination: { idUbigeo: -1 },
    currency: { idCurrency: -1 },
    driver: { names: "", lastNames: "" },
    bill: {}
  };

  constructor(private router: Router, private route: ActivatedRoute, private dialogService: MatDialog, private companyService: CompanyService, private utilService: UtilService, private bookingService: BookingService) {
    this.utilService.getUbigeoLimaMetropolitana().subscribe({
      next: (response: Ubigeo[]) => this.ubigeo = response,
      error: (error: any) => SwalCustoms.nyanAlert(error.message)
    });

    this.utilService.getCurrencies().subscribe({
      next: (response: Currency[]) => {
        this.currencies = response;
        this.booking.currency!.idCurrency = this.defaultCurrencySoles;
      },
      error: (error: any) => SwalCustoms.nyanAlert(error.message)
    })

    this.utilService.getAreasByCompany(0).subscribe({
      next: (response: Area[]) => this.areas = response,
      error: (error: any) => SwalCustoms.nyanAlert(error.message)
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const mode = params['mode'];
      const id = params['id'];

      if (mode == null || id == null) {
        SwalCustoms.nyanAlert("Ingrese correctamente a la página de reservas, mediante el botón de nueva reserva de la empresa ó mediante el botón de detalles de reservas.");
        this.router.navigate(['booking']);
      }

      if (mode != "new" && mode != "edit") {
        SwalCustoms.nyanAlert("El Sistema no reconoce el modo de la página de reservas.");
        this.router.navigate(['booking']);
      }

      if (id <= 0) {
        SwalCustoms.nyanAlert("Ingrese un ID válido.");
        this.router.navigate(['booking']);
      }

      if (mode == "new") {
        this.companyService.getById(id).subscribe({
          next: (response: Company) => {
            this.company = response;
            this.disableOptions = true;
          },
          error: (error: any) => {
            if (error.status == 404) {
              SwalCustoms.nyanAlert("No se encontró la empresa");
              this.router.navigate(['company']);
            } else {
              SwalCustoms.nyanAlert(error.message);
              this.router.navigate(['company']);
            }
          }
        });
      }

      if (mode == "edit") {
        this.bookingService.getById(id).subscribe({
          next: (response) => {
            this.booking = response;
            this.dateForm = format(new Date(this.booking.date!), 'yyyy-MM-dd');
            this.timeForm = format(new Date(this.booking.time!), 'HH:mm');
          },
          error: (error) => {
            if (error.status == 404) {
              SwalCustoms.nyanAlert("No se encontró la reserva");
              this.router.navigate(['booking']);
            } else {
              SwalCustoms.nyanAlert(error.message);
              this.router.navigate(['booking']);
            }
          }
        });
      }

      this.mode = mode;
    });
    /*
    const mode = this.route.snapshot.paramMap.get('mode');
    const idCompany = this.route.snapshot.paramMap.get('id');

    if (mode == null || idCompany == null) {
      SwalCustoms.nyanAlert("Ingrese correctamente a la página de reservas, mediante el botón de nueva reserva de la empresa ó mediante el botón de detalles de reservas.");
      this.router.navigate(['booking']);
    }

    if (idCompany == null) {
    }

    // Get company by id from service and set it to company variable
    this.companyService.getById(idCompany!).subscribe({
      next: (response: Company) => {
        this.company = response;
      },
      // If error is 404 (Not found), redirect to company, else show error message and redirect to company
      error: (error: any) => {
        if (error.status == 404) {
          SwalCustoms.nyanAlert("No se encontró la empresa");
          this.router.navigate(['company']);
        } else {
          SwalCustoms.nyanAlert(error.message);
          this.router.navigate(['company']);
        }
      }
    });*/
  }

  save() {
    // const date = parse(this.dateForm, 'yyyy-MM-dd', new Date());
    // const time = parse(`${this.dateForm} ${this.timeForm}`, 'yyyy-MM-dd HH:mm', new Date());
    // this.booking.date = date.toString();
    // this.booking.time = time.toString();
    this.booking.date = this.dateForm;
    this.booking.time = this.timeForm;
    this.booking.company = this.company;

    console.log("this.booking", this.booking);
    this.bookingService.save(this.booking).subscribe({
      next: (response: any) => {
        SwalCustoms.info("Se guardó correctamente");
        this.router.navigate(['company']);
      },
      error: (error: any) => SwalCustoms.nyanAlert(error.message)
    });
  }

  openDriverDialog() {
    const dialogRef = this.dialogService.open(DriverSearchComponent, { data: this.booking });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.booking.driver = result;
      }
    });
  }

}
