import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill-main',
  templateUrl: './bill-main.component.html',
  styleUrls: ['./bill-main.component.css']
})

export class BillMainComponent {
  filter: string = '';
  dataSource: any;

  displayedColumns = ["idBooking", "date", "time", "company", "area", "passenger", "pickUp", "destination", "price", "driver", "status", "actions"];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;


  constructor(route: ActivatedRoute) {

  }

  search() {

  }

}
