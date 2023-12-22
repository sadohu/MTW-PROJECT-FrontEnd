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

  displayedColumns = ["businessName", "idNumber", "address", "tradeName", "phone", "actions"];

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

  searchRevista() {
    this.companyService.getCompanies(this.filter).subscribe(
      response => {
        this.dataSource = new MatTableDataSource<Company>(response);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  updateEstado(item: any) {
    // item.estado = item.estado == 1 ? 0 : 1;
    // this.revistaService.update(item).subscribe();
  }

  deleteRevista(item: any) {
    // Swal.fire({
    //   title: "¿Desea eliminar la revista?",
    //   text: "Los cambios no podrán ser revertidos",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Sí, eliminar",
    //   cancelButtonText: "No, cancelar",
    // }).then(result => {
    //   if (result.isConfirmed) {
    //     this.revistaService.delete(item.idRevista || 0).subscribe(
    //       response => {
    //         this.refreshTable();
    //         Swal.fire("Mensaje", response.message, "info");
    //       }
    //     );
    //   }
    // });
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
