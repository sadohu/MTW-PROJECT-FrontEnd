import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Bill } from 'src/app/models/bill.model';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-bill-main',
  templateUrl: './bill-main.component.html',
  styleUrls: ['./bill-main.component.css']
})

export class BillMainComponent implements OnInit {
  filter: string = '';
  dataSource: any;
  bills: Bill[] = [];

  displayedColumns = ["idBooking", "date", "time", "company", "area", "passenger", "pickUp", "destination", "price", "driver", "status", "actions"];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private route: ActivatedRoute, private billService: BillService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const mode = params['mode'];
      const id = params['id'];
      if (mode == 'company') {
        this.refreshTableByCompany(id);
      }
    });
  }

  search() {

  }

  refreshTable() {
    this.billService.getAll().subscribe({
      next: (response: any) => {
        // console.log("response", response);
        this.bills = response;
        this.dataSource = new MatTableDataSource(this.bills);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log("error", error);
      }
    });
  }

  refreshTableByCompany(id: number) {
    this.billService.getAllByCompany(id).subscribe({
      next: (response: any) => {
        // console.log("response", response);
        this.bills = response;
        this.dataSource = new MatTableDataSource(this.bills);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log("error", error);
      }
    });
  }

}
