import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalCustoms } from 'src/app/Utils/SwalCustoms';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-booking-save',
  templateUrl: './booking-save.component.html',
  styleUrls: ['./booking-save.component.css']
})

export class BookingSaveComponent implements OnInit {

  company: Company = {};

  constructor(private router: Router, private route: ActivatedRoute, private companyService: CompanyService) {

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

}
