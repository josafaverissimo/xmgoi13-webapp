import { Component, Input, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Smg13RowInterface } from "../../../services/xmgoi-api.service";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from "@angular/material/button";


@Component({
  selector: 'app-xmgoi-products-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './xmgoi-products-table.component.html',
  styleUrl: './xmgoi-products-table.component.css'
})
export class XmgoiProductsTableComponent implements OnChanges {
  @Input() dataSource: Smg13RowInterface[] = []
  productsRowsWeakMap: WeakMap<Smg13RowInterface, ProductSaleData> = new WeakMap()
  columnsToDisplay: string[] = [
    'select',
    'productCode',
    'productDescription',
    'productPacking',
    'productAmount',
    'productValue',
    'productTotalValue',
    'productCodeBar'
  ]
  rowsSelection = new SelectionModel<Smg13RowInterface>(true, [])
  totalProductsValue: number = 0

  ngOnChanges() {
    this.dataSource.forEach(smg13Row => {
      if(!this.productsRowsWeakMap.has(smg13Row)) {
        this.productsRowsWeakMap.set(smg13Row, {
          productAmount: 0,
          productValue: 0
        })
      }
    })
  }

  getProductSaleDataTotal(productRow: Smg13RowInterface) {
    const productSaleData = this.productsRowsWeakMap.get(productRow)

    if(!productSaleData) return 0

    return productSaleData!.productValue * productSaleData!.productAmount
  }

  updateProductAmount(productRow: Smg13RowInterface, event: Event) {
    //@ts-ignore
    const amountValue = event.target.value
    const productSaleData = this.productsRowsWeakMap.get(productRow)

    //@ts-ignore
    productSaleData.productAmount = Number(amountValue)

    //@ts-ignore
    this.productsRowsWeakMap.set(productRow, productSaleData)

    this.setTotalProductsValue()
  }

  updateProductValue(productRow: Smg13RowInterface, event: Event) {
    //@ts-ignore
    const productValue = event.target.value
    const productSaleData = this.productsRowsWeakMap.get(productRow)

    //@ts-ignore
    productSaleData.productValue = Number(productValue)

    //@ts-ignore
    this.productsRowsWeakMap.set(productRow, productSaleData)

    this.setTotalProductsValue()
  }

  setTotalProductsValue() {
    //@ts-ignore
    this.totalProductsValue = this.dataSource.reduce((total, smg13Row) => {
      const productSaleData = this.productsRowsWeakMap.get(smg13Row)

      if(!productSaleData) {
        console.log(this.dataSource)
        return total
      }

      return total + (productSaleData!.productValue * productSaleData!.productAmount)
    }, 0)
  }

  isAllSelected() {
    const totalSelectedRows = this.rowsSelection.selected.length
    const totalRows = this.dataSource.length

    return totalRows === totalSelectedRows
  }

  toggleAllRows() {
    if(this.isAllSelected()) {
      this.rowsSelection.clear()
      return
    }

    this.rowsSelection.select(...this.dataSource)
  }

  removeSelectedRows() {
    this.dataSource = this.dataSource.filter(smg13Row => {
      const isSelected = this.rowsSelection.isSelected(smg13Row)
      this.rowsSelection.deselect(smg13Row)

      if(!isSelected) {
        this.productsRowsWeakMap.delete(smg13Row)
        this.setTotalProductsValue()
      }

      return !isSelected
    })
  }
}

export interface ProductSaleData {
  productAmount: number;
  productValue: number;
}
