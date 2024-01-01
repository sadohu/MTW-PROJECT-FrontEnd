import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalCustoms } from 'src/app/Utils/SwalCustoms';
import { DriverSearchComponent } from 'src/app/dialogs/driver-search/driver-search.component';
import { Area } from 'src/app/models/area.model';
import { Booking } from 'src/app/models/booking.model';
import { Company } from 'src/app/models/company.model';
import { Currency } from 'src/app/models/currency.model';
import { Driver } from 'src/app/models/driver.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { CompanyService } from 'src/app/services/company.service';

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

  booking: Booking = {
    company: { idCompany: -1 },
    area: { idArea: -1 },
    passenger: { names: "", lastNames: "" },
    ubigeoPickUp: { idUbigeo: -1 },
    ubigeoDestination: { idUbigeo: -1 },
    currency: { idCurrency: -1 },
    driver: { names: "", lastNames: "" },
    bill: {}
  };

  constructor(private router: Router, private route: ActivatedRoute, private dialogService: MatDialog, private companyService: CompanyService) {

  }

  ngOnInit(): void {
    // Get id from url
    const idCompany = this.route.snapshot.paramMap.get('id');

    // Validate id is not null, if it is null, redirect to company
    if (idCompany == null) {
      this.router.navigate(['company']);
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
    });
  }

  save() {
    console.log("this.booking", this.booking);

  }

  openDriverDialog() {
    const dialogRef = this.dialogService.open(DriverSearchComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.booking.driver = result;
      }
    });
  }

}
