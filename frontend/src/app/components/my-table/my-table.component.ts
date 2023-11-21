import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { XmgoiApiService, Smg13RowInterface } from "../../services/xmgoi-api.service";

@Component({
  selector: 'app-my-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './my-table.component.html',
  styleUrl: './my-table.component.css'
})
export class MyTableComponent {
  displayedColumns: string[] = [
    'productCode',
    'productDigit',
    'productDescription',
    'productPacking',
    'productStockEmb1',
    'productStockEmb9',
    'productSalePrice'
  ]
  dataSource: Smg13RowInterface[] = []
  offset = 0

  constructor(private xmgoiApi: XmgoiApiService) {
    this.xmgoiApi.getSmgoi13Data(this.offset).subscribe(smgoi13Data => {
      this.dataSource = smgoi13Data
    })
  }
}
