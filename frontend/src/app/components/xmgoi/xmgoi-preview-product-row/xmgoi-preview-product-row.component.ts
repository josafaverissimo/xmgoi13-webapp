import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";
import { Smg13RowInterface } from "../../../services/xmgoi-api.service";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-xmgoi-preview-product-row',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './xmgoi-preview-product-row.component.html',
  styleUrl: './xmgoi-preview-product-row.component.css'
})
export class XmgoiPreviewProductRowComponent {
  @Output() onDataRowSubmit: EventEmitter<any> = new EventEmitter()
  @Input()
  public set productRow(productRow: Smg13RowInterface|undefined) {
    if(productRow) {
      this.dataSource = [productRow]
    }
  }
  dataSource: Smg13RowInterface[] = []
  columnsToDisplay: string[] = ['productCode', 'productDescription', 'productPacking', 'productCodeBar']

  dataRowSubmit() {
    this.onDataRowSubmit.emit(this.dataSource[0])
  }
}
