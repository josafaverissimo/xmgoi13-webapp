import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class XmgoiApiService {
  private baseUrl = "http://localhost:8080/"

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

  getSmgoi13Data(offset: number): Observable<Smg13RowInterface[]> {
    const url = this.getUrl(`smgoi13/getAll/${offset}`)

    return this.http.get<Smg13RowInterface[]>(url)
  }
}

export interface Smg13RowInterface {
  id: number;
  productCode: number;
  productDigit: number;
  productDescription: string;
  productPacking: string;
  productStockEmb1: number;
  productStockEmb9: number;
  productSalePrice: number;
}
