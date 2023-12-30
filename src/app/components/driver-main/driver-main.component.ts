import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SwalCustoms } from 'src/app/Utils/SwalCustoms';
import { DriverSaveComponent } from 'src/app/dialogs/driver-save/driver-save.component';
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
  newDriver: Driver = { idDriver: 0 };

  displayedColumns = ["names", "lastNames", "idNumber", "phone", "brand", "model", "carPlate", "year", "color", "actions"];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private driverService: DriverService, private dialogService: MatDialog, private router: Router) {
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
        SwalCustoms.nyanAlert(error.message);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSaveDialog(driver: Driver) {
    const dialogRef = this.dialogService.open(DriverSaveComponent, { data: driver });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshTable();
      }
    });
  }

  deleteDriver(item: Driver) {

  }
}
