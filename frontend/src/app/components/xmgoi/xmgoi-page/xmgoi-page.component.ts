import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Smg13RowInterface, XmgoiApiService} from "../../../services/xmgoi-api.service";

@Component({
  selector: 'app-xmgoi-page',
  templateUrl: './xmgoi-page.component.html',
  styleUrl: './xmgoi-page.component.css'
})
export class XmgoiPageComponent {
  cnpj: string = ''
  productRow: Smg13RowInterface|undefined
  packingList: Smg13RowInterface[] = []

  constructor(
    private snackBar: MatSnackBar,
    private xmgoiApi: XmgoiApiService
  ) {}

  setCnpjValue(cnpj: string): void {
    this.cnpj = cnpj
  }

  searchProductByCode(productCode: string, callback: Function|undefined = undefined) {
    if(productCode.length === 0) {
      this.snackBar.open('Informe a Mercadoria', 'Fechar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      })

      return
    }

    this.xmgoiApi.getProductDataByCode(productCode).subscribe(productRow => {
      //@ts-ignore
      if(productRow.error) {
        this.snackBar.open('Mercadoria não encontrada', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000
        })
        return
      }

      this.productRow = productRow

      if(callback) {
        callback(productRow)
      }
    })
  }

  searchProductAndAddInPackingList(productCode: string) {
    this.searchProductByCode(productCode, (productRow: Smg13RowInterface) => {
      this.pushProductInPackingList(productRow)
    })
  }

  pushProductInPackingList(productRow: Smg13RowInterface) {
    this.packingList = [...this.packingList, productRow]
  }
}
