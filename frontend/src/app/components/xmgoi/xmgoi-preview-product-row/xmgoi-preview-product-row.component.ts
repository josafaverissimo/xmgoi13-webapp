import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";
import { Smg13RowInterface } from "../../../services/xmgoi-api.service";

@Component({
  selector: 'app-xmgoi-preview-product-row',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './xmgoi-preview-product-row.component.html',
  styleUrl: './xmgoi-preview-product-row.component.css'
})
export class XmgoiPreviewProductRowComponent {
  @Input()
  public set productRow(productRow: Smg13RowInterface|undefined) {
    if(productRow) {
      this.dataSource = [productRow]
    }
  }
  dataSource: Smg13RowInterface[] = []
  columnsToDisplay: string[] = ['productCode', 'productDigit', 'productDescription', 'productPacking', 'productCodeBar']
}
