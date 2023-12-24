import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/app/models/company.model';
import { User } from 'src/app/models/user.model';
import { CompanyService } from 'src/app/services/company.service';
import { UtilService } from 'src/app/services/util.service';
import { listClientDocument } from 'src/app/Utils/ModelsDto';
import { SwalCustoms } from 'src/app/Utils/SwalCustoms';

@Component({
  selector: 'app-company-save',
  templateUrl: './company-save.component.html',
  styleUrls: ['./company-save.component.css']
})

export class CompanySaveComponent {
  listDocument = listClientDocument;
  idNumber: string = "";
  user: User = {};

  company: Company = {
    idCompany: 0,
    businessName: "",
    idNumber: "",
    address: "",
    tradeName: "",
    phone: "",
  }

  formSaveCompany = this.formBuilder.group({
    validIdNumber: ['', [Validators.required, Validators.pattern("[0-9]{11}")]],
    validBusinessName: ['', [Validators.required, Validators.minLength(5), Validators.pattern("[a-zA-Zá-úÁ-ÚñÑ0-9 \\.]+")]],
    validAddress: ['', [Validators.required, Validators.minLength(5), Validators.pattern("[a-zA-Zá-úÁ-ÚñÑ0-9 \\.]+")]],
  });

  constructor(public dialogRef: MatDialogRef<CompanySaveComponent>, private formBuilder: FormBuilder, private utilService: UtilService, private companyService: CompanyService) {
    // this.utilService.listaPais().subscribe(
    //   response => this.listPais = response
    // );
    // this.utilService.listaTipoLibroRevista().subscribe(
    //   response => this.listTipoRevista = response
    // );
    // this.usuario.idUsuario = tokenService.getUserId();
  }

  searchRUC() {
    this.setCompanyToNull();

    this.utilService.searchRUC(this.idNumber!).subscribe(
      response => {
        console.log(response);

        if (response.success == false) {
          SwalCustoms.nyanAlert("RUC no encontrado ó no se encuentra activo");
          return;
        }

        this.company.idNumber = response.ruc;
        this.company.businessName = response.razonSocial;
        this.company.address = response.direccion;
      }
    )
  }

  saveCompany() {
    const valid = this.validSpacesOnInputs();
    if (valid) {
      // this.revista.usuarioRegistro = this.usuario;
      // this.revista.usuarioActualiza = this.usuario;
      this.companyService.saveCompany(this.company).subscribe(
        response => {
          SwalCustoms.info(response.message)
          this.setCompanyToNull();
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
    this.setCompanyToNull();
  }

  private validSpacesOnInputs() {
    const idNumber = this.company.idNumber?.trim();
    if (idNumber!.length != 11) {
      SwalCustoms.error("Ingrese un RUC válido.");
      return false;
    }

    const businessName = this.company.businessName?.trim();
    if (businessName!.length < 3) {
      SwalCustoms.error("Ingrese una Razón Social válida.");
      return false;
    }

    const address = this.company.address?.trim();
    if (address!.length < 5) {
      SwalCustoms.error("Ingrese una dirección válida.");
      return false;
    }

    this.company.idNumber = idNumber;
    this.company.businessName = businessName;
    this.company.address = address;
    return true;
  }

  private setCompanyToNull() {
    this.company = {
      idCompany: 0,
      businessName: "",
      idNumber: "",
      address: "",
      tradeName: "",
      phone: "",
    }
  }
}
