import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SwalCustoms } from 'src/app/Utils/SwalCustoms';
import { DriverMainComponent } from 'src/app/components/driver-main/driver-main.component';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-driver-save',
  templateUrl: './driver-save.component.html',
  styleUrls: ['./driver-save.component.css']
})
export class DriverSaveComponent {
  driver: Driver = {};
  idNumber: string = "";
  saveForm = false;

  formSaveDriver = this.formBuilder.group({
    validIdNumber: ['', [Validators.required, Validators.pattern("[0-9]{8}")]],
    validPhone: ['', [Validators.required, Validators.pattern("[0-9]{9}")]],
    validNames: ['', [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Zá-úÁ-ÚñÑ0-9 \\.]+")]],
    validLastNames: ['', [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Zá-úÁ-ÚñÑ0-9 \\.]+")]],
    validBrand: ['', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Zá-úÁ-ÚñÑ0-9 \\.]+")]],
    validModel: ['', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Zá-úÁ-ÚñÑ0-9 \\.]+")]],
    validCarPlate: ['', [Validators.required, Validators.minLength(6), Validators.pattern("[a-zA-Zá-úÁ-ÚñÑ0-9 \\-\\.]+")]],
    validYear: ['', [Validators.required, Validators.pattern("[0-9]{4}")]],
    validColor: ['', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Zá-úÁ-ÚñÑ0-9 \\-\\.]+")]],
  });

  constructor(private dialogRef: MatDialogRef<DriverMainComponent>, private formBuilder: FormBuilder, private utilService: UtilService, private driverService: DriverService, @Inject(MAT_DIALOG_DATA) public data: Driver,) {
    if (data.idDriver == 0)
      this.saveForm = true;
    else {
      this.saveForm = false;
      this.idNumber = data.idNumber!;
    }

    this.driver = data;
  }

  searchDNI() {
    this.setDriverToNull();

    this.utilService.searchDNI(this.idNumber!).subscribe(
      response => {
        // console.log("response", response);

        if (response.success == false) {
          SwalCustoms.nyanAlert("DNI no encontrado");
          return;
        }

        this.driver.idNumber = response.dni;
        this.driver.names = response.nombres;
        this.driver.lastNames = response.apellidoPaterno + " " + response.apellidoMaterno;
      }
    );
  }

  save() {
    this.setUpperCase();
    if (this.driver.idDriver == 0) {
      this.driverService.create(this.driver).subscribe({
        next: response => {
          SwalCustoms.info("Registro exitoso");
          this.closeDialog();
        },
        error: error => {
          SwalCustoms.nyanAlert(error.message);
        }
      });
    } else {
      this.driverService.update(this.driver).subscribe({
        next: response => {
          SwalCustoms.info("Actualización exitosa");
          this.closeDialog();
        },
        error: error => {
          SwalCustoms.nyanAlert(error.message);
        }
      });
    }
  }

  closeDialog() {
    this.setDriverToNull();
    this.setCarToNull();
    this.driver.phone = "";
    this.dialogRef.close(true);
  }

  setDriverToNull() {
    this.driver.idDriver = 0;
    this.driver.idNumber = "";
    this.driver.names = "";
    this.driver.lastNames = "";
  }

  setCarToNull() {
    this.driver.brand = "";
    this.driver.model = "";
    this.driver.carPlate = "";
    this.driver.year = "";
    this.driver.color = "";
  }

  setUpperCase() {
    this.driver.names = this.driver.names?.toUpperCase();
    this.driver.lastNames = this.driver.lastNames?.toUpperCase();
    this.driver.brand = this.driver.brand?.toUpperCase();
    this.driver.model = this.driver.model?.toUpperCase();
    this.driver.carPlate = this.driver.carPlate?.toUpperCase();
    this.driver.color = this.driver.color?.toUpperCase();
  }

}