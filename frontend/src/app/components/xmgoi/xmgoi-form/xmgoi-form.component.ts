import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {XmgoiApiService, CustomerRowInterface, Smg13RowInterface} from '../../../services/xmgoi-api.service'
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { FormsModule } from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MyTableComponent} from "../../my-table/my-table.component";
import { XmgoiPreviewProductRowComponent } from "../xmgoi-preview-product-row/xmgoi-preview-product-row.component";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-xmgoi-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    NgxMaskDirective,
    MatAutocompleteModule,
    FormsModule,
    MatButtonModule,
    MyTableComponent,
    XmgoiPreviewProductRowComponent
  ],
  providers: [provideNgxMask()],
  templateUrl: './xmgoi-form.component.html',
  styleUrl: './xmgoi-form.component.css'
})
export class XmgoiFormComponent {
  xmgoiFormFields: XmgoiFormFieldsInterface = {
    cnpj: '',
    productCode: ''
  }
  customersData: CustomerRowInterface[] = []
  productRow!: Smg13RowInterface
  waitingResponse: boolean = false

  constructor(
    private xmgoiApi: XmgoiApiService,
    private snackBar: MatSnackBar
  ) {
    this.xmgoiApi.getCustomersData().subscribe(customersData => {
      this.customersData = customersData
    })
  }

  formSubmitHandler() {
    if(this.xmgoiFormFields.productCode.length === 0) {
      this.snackBar.open('Informe a Mercadoria', 'Fechar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      })
      return
    }

    this.waitingResponse = true
    this.xmgoiApi.getProductDataByCode(this.xmgoiFormFields.productCode).subscribe(productRow => {
      if(!productRow) {
        this.snackBar.open('Mercadoria não encontrada', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        })
      }

      this.productRow = productRow
      this.waitingResponse = false
    })
  }
}

export interface XmgoiFormFieldsInterface  {
  cnpj: string;
  productCode: string;
}
