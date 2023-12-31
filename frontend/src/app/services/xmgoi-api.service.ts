import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TableDataInterface } from "../components/my-table/my-table.component";

@Injectable({
  providedIn: 'root'
})
export class XmgoiApiService {
  private baseUrl = "https://localhost:8080/"

  constructor(private http: HttpClient) {}

  private getUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`
  }

  updateSmgoi13(file: File) : Observable<any> {
    const url = this.getUrl('smgoi13/update')

    const formData = new FormData()
    formData.append('smg13', file)

    return this.http.post(url, formData)
  }

  getSmgoi13Data(offset: number, rowsCount: number, term: string|undefined): Observable<TableDataInterface> {
    let url = this.getUrl(`smgoi13/getAll/${offset}/${rowsCount}`)

    if(term) {
      url += `?term=${term.toLocaleLowerCase()}`
    }


    return this.http.get<TableDataInterface>(url)
  }

  getProductDataByCode(productCode: string): Observable<Smg13RowInterface> {
    const url = this.getUrl(`smgoi13/getByProductCode/${productCode}`)

    return this.http.get<Smg13RowInterface>(url)
  }

  getCustomerByCnpj(cnpj: string): Observable<CustomerRowInterface> {
    const url = this.getUrl(`customers/getByCnpj/${cnpj}`)

    return this.http.get<CustomerRowInterface>(url)
  }

  getCustomersData(
    offset: number|undefined = undefined,
    rowsCount: number|undefined = undefined,
    term: string|undefined = undefined
  ): Observable<TableDataInterface> {
    let endpoint = 'customers/getAll'

    if(offset !== undefined) {
      endpoint += `/${offset}`
    }

    if(rowsCount !== undefined) {
      endpoint += `/${rowsCount}`
    }

    if(term !== undefined) {
      endpoint += `?term=${term}`
    }

    const url = this.getUrl(endpoint)

    return this.http.get<TableDataInterface>(url)
  }

  createCustomer(customerData: FormData): Observable<any> {
    const url = this.getUrl('customers/create')

    return this.http.post<any>(url, customerData)
  }

  updateCustomerLastPurchaseDay(cnpj: string): Observable<ErrorInterface> {
    console.log(cnpj)
    const url = this.getUrl(`customers/updateLastPurchaseDay/${cnpj}`)

    return this.http.get<ErrorInterface>(url)
  }
}

export interface Smg13RowInterface {
  id: string;
  productCode: string;
  productDigit: string;
  productDescription: string;
  productPacking: string;
  productStockEmb1: string;
  productStockEmb9: string;
  productSalePrice: string;
}

export interface CustomerRowInterface {
  id: number;
  name: string;
  socialReason: string;
  cnpj: string;
  phone: string;
  email: string;
  createdAt: string;
  lastPurchaseDay: string;
}

export interface ErrorInterface {
  error: boolean;
  message: string;
}
