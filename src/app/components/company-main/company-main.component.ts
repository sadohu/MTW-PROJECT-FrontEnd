import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CompanySaveComponent } from 'src/app/dialogs/company-save/company-save.component';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-main',
  templateUrl: './company-main.component.html',
  styleUrls: ['./company-main.component.css'],
})

export class CompanyMainComponent {
  filter: string = "";
  dataSource: any;

  displayedColumns = ["businessName", "idNumber", "tradeName", "address", "phone", "actions"];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private companyService: CompanyService, private dialogService: MatDialog) {
    this.refreshTable();
  }

  private refreshTable() {
    this.companyService.getCompanies("").subscribe(
      response => {
        this.dataSource = new MatTableDataSource<Company>(response);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  search() {
    this.companyService.getCompanies(this.filter).subscribe(
      response => {
        this.dataSource = new MatTableDataSource<Company>(response);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  newBooking(item: Company) {

  }

  openAddDialog() {
    const dialogRef = this.dialogService.open(CompanySaveComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

}
