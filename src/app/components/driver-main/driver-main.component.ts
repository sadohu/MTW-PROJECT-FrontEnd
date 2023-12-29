import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SwalCustoms } from 'src/app/Utils/SwalCustoms';
import { CompanySaveComponent } from 'src/app/dialogs/company-save/company-save.component';
import { Company } from 'src/app/models/company.model';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-main',
  templateUrl: './driver-main.component.html',
  styleUrls: ['./driver-main.component.css']
})

export class DriverMainComponent {
  filter: string = "";
  dataSource: any;

  displayedColumns = ["names", "lastNames", "idNumber", "phone", "brand", "model", "carPlate", "year", "color", "actions"];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private driverService: DriverService, private dialogService: MatDialog, private router: Router) {
    this.driverService.getAll().subscribe({
      next: (response: Driver[]) => {
        this.dataSource = new MatTableDataSource<Driver>(response);
        this.dataSource.paginator = this.paginator;
      },
      error: (error: any) => {
        SwalCustoms.nyanAlert(error.message);
      }
    });
  }

  private refreshTable() {

  }

  search() {

  }

  newBooking(item: Driver) {

  }

  openAddDialog() {

  }

  openUpdateDialog(item: any) {

  }

  deleteRevista(item: any) {

  }
}
