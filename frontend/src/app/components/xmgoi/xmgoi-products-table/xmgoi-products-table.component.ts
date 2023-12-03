import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Smg13RowInterface } from "../../../services/xmgoi-api.service";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-xmgoi-products-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './xmgoi-products-table.component.html',
  styleUrl: './xmgoi-products-table.component.css'
})
export class XmgoiProductsTableComponent {
  @Input() dataSource: Smg13RowInterface[] = []
  columnsToDisplay: string[] = ['productCode', 'productDescription', 'productPacking', 'productCodeBar']
}
