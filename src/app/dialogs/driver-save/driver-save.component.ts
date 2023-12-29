import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DriverMainComponent } from 'src/app/components/driver-main/driver-main.component';

@Component({
  selector: 'app-driver-save',
  templateUrl: './driver-save.component.html',
  styleUrls: ['./driver-save.component.css']
})
export class DriverSaveComponent {

  constructor(private dialogRef: MatDialogRef<DriverMainComponent>, @Inject(MAT_DIALOG_DATA) public data: number) {
    console.log("data", data);

  }
}
