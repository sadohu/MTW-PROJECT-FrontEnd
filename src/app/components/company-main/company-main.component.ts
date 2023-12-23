import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(private companyService: CompanyService) {
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
    // const dialogRef = this.dialogService.open(CrudRevistaAddComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 1) {
    //     this.refreshTable();
    //   }
    // });
  }

  openUpdateDialog(item: any) {
    // const dialogRef = this.dialogService.open(CrudRevistaUpdateComponent, { data: item });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 1) {
    //     this.refreshTable();
    //   }
    // });
  }

}
