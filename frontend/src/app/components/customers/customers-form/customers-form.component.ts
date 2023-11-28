import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XmgoiApiService } from "../../../services/xmgoi-api.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-customers-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgxMaskDirective,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './customers-form.component.html',
  styleUrl: './customers-form.component.css'
})
export class CustomersFormComponent {
  waitingResponse = false
  customerFieldsValues: CustomerFormFields = {
    name: '',
    socialReason: '',
    cnpj: '',
    phone: '',
    email: ''
  }

  constructor(private xmgoiApi: XmgoiApiService) {}

  private getCustomerFormData(): FormData {
    const customerFormData = new FormData()

    Object.keys(this.customerFieldsValues).forEach(fieldName => {
      //@ts-ignore
      customerFormData.set(fieldName, this.customerFieldsValues[fieldName])
    })

    return customerFormData
  }

  customerFormSubmit() {
    this.waitingResponse = true
    const customerFormData = this.getCustomerFormData()

    this.xmgoiApi.createCustomer(customerFormData).subscribe(response => {
      this.waitingResponse = false
    })
  }
}

export interface CustomerFormFields {
  name: string;
  socialReason: string;
  cnpj: string;
  phone: string;
  email: string;
}
