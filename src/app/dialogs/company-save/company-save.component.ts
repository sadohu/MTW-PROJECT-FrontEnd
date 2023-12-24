import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { listClientDocument } from 'src/app/Utils/ModelsDto';

@Component({
  selector: 'app-company-save',
  templateUrl: './company-save.component.html',
  styleUrls: ['./company-save.component.css']
})

export class CompanySaveComponent {
  listDocument = listClientDocument;
  listTipoRevista: any[] = [];
  revista: any = {
    nombre: "",
    frecuencia: "",
    fechaCreacion: "",
    pais: {
      idPais: -1
    },
    tipoRevista: {
      idDataCatalogo: -1
    }
  };
  user: User = {};

  formAddRevista = this.formBuilder.group({
    validNombre: ['', [Validators.required, Validators.pattern("[a-zA-Zá-úÁ-ÚñÑ0-9 ]{3,50}")]],
    validFrecuencia: ['', [Validators.required, Validators.pattern("[a-zA-Zá-úÁ-ÚñÑ0-9 ]{5,50}")]],
    validFechaCreacion: ['', [Validators.required, this.fechaValidator]],
    validPais: ['', [Validators.min(1)]],
    validTipoRevista: ['', [Validators.min(1)]],
  });

  constructor(public dialogRef: MatDialogRef<CompanySaveComponent>, private formBuilder: FormBuilder) {
    // this.utilService.listaPais().subscribe(
    //   response => this.listPais = response
    // );
    // this.utilService.listaTipoLibroRevista().subscribe(
    //   response => this.listTipoRevista = response
    // );
    // this.usuario.idUsuario = tokenService.getUserId();
  }

  addRevista() {
    // const valid = this.validSpacesOnInputs();
    // if (valid) {
    //   this.revista.usuarioRegistro = this.usuario;
    //   this.revista.usuarioActualiza = this.usuario;
    //   this.revistaService.insert(this.revista).subscribe(
    //     item => {
    //       Swal.fire({
    //         icon: "info",
    //         title: "Resultado del registro",
    //         text: item.message,
    //       });
    //       this.setRevistaToNull();
    //     }
    //   );
    // }
  }

  closeDialog() {
    // this.dialogRef.close();
    // this.setRevistaToNull();
  }

  private fechaValidator(control: FormControl) {
    // const fechaString = control.value;

    // if (!fechaString) {
    //   return { required: true };
    // }

    // if (fechaString.length > 10) {
    //   return { invalidFormat: true };
    // }

    // const fechaActual = new Date();
    // const [year, month, day] = fechaString.split('-').map(Number);

    // if (day > 31 || month > 12) {
    //   return { invalidDate: true };
    // }

    // if (year < 1000) {
    //   return { invalidYear: true };
    // }

    // const fecha = new Date(year, month - 1, day);

    // if (isNaN(fecha.getTime())) {
    //   return { invalidDate: true };
    // }

    // if (fecha > fechaActual) {
    //   return { futureDate: true };
    // }

    // return null;
  }

  private validSpacesOnInputs() {
    // const nombre = this.revista.nombre?.trim();
    // if (nombre!.length < 3) {
    //   this.showErrorMessage("Ingrese un nombre válido de al menos tres caracteres.");
    //   return false;
    // }

    const frecuencia = this.revista.frecuencia?.trim();
    // if (frecuencia!.length < 5) {
    //   this.showErrorMessage("Ingrese una frecuencia válida de al menos cinco caracteres.");
    //   return false;
    // }
    // this.revista.nombre = nombre;
    // this.revista.frecuencia = frecuencia;
    // return true;
  }

  private showErrorMessage(message: string) {
    // Swal.fire({
    //   icon: "error",
    //   title: "Error del formulario!!!",
    //   text: message,
    // });
  }

  private setRevistaToNull() {
    // this.revista = {
    //   idRevista: 0,
    //   nombre: "",
    //   frecuencia: "",
    //   fechaCreacion: "",
    //   tipoRevista: {
    //     idDataCatalogo: -1
    //   },
    //   pais: {
    //     idPais: -1,
    //   },
    //   estado: 0,
    // };
  }
}