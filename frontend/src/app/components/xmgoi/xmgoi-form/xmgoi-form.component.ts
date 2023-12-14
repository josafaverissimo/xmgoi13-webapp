import {Component, EventEmitter, Output} from '@angular/core';
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
  @Output() onCnpjSubmit: EventEmitter<any> = new EventEmitter()
  @Output() onProductCodeSubmit: EventEmitter<any> = new EventEmitter()
  @Output() onAddProductSubmit: EventEmitter<any> = new EventEmitter()
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
      this.customersData = customersData.data
    })
  }

  productCodeSubmit() {
    this.onProductCodeSubmit.emit(this.xmgoiFormFields.productCode)
  }

  cnpjSubmit() {
    this.onCnpjSubmit.emit(this.xmgoiFormFields.cnpj)
  }

  addProductSubmit() {
    this.onAddProductSubmit.emit(this.xmgoiFormFields.productCode)
  }
}

export interface XmgoiFormFieldsInterface  {
  cnpj: string;
  productCode: string;
}
