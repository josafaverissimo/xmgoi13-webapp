import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {CommonModule, NgOptimizedImage, DatePipe } from '@angular/common';
import {Smg13RowInterface, XmgoiApiService} from "../../../services/xmgoi-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {XmgoiProductsTableComponent} from "../xmgoi-products-table/xmgoi-products-table.component";

@Component({
  selector: 'app-xmgoi-packing-list',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, XmgoiProductsTableComponent],
  providers: [DatePipe],
  templateUrl: './xmgoi-packing-list.component.html',
  styleUrl: './xmgoi-packing-list.component.css'
})
export class XmgoiPackingListComponent implements OnChanges, OnInit {
  @Input() customerId: string = ''
  @Input() packingList: Smg13RowInterface[] = []
  customerSocialReason: string = ''
  currentDateTime: string|null = ''

  constructor(
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private xmgoiApi: XmgoiApiService
  ) {}

  ngOnInit() {
    this.currentDateTime = this.datePipe.transform(new Date(), "dd/MM/yyyy H:mm:ss")
  }

  ngOnChanges() {
    if(this.customerId === '') {
      return
    }

    this.xmgoiApi.getCustomerByCnpj(this.customerId).subscribe(customerRow => {
      //@ts-ignore
      if(customerRow.error) {
        this.snackBar.open('Cliente não encontrado', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000
        })

        return
      }

      this.customerSocialReason = customerRow.socialReason
    })
  }
}
