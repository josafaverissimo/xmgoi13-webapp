import {Component, Input, OnInit, OnChanges, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import {CommonModule, NgOptimizedImage, DatePipe } from '@angular/common';
import {Smg13RowInterface, XmgoiApiService} from "../../../services/xmgoi-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {XmgoiProductsTableComponent} from "../xmgoi-products-table/xmgoi-products-table.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { GeneratePdfService } from "../../../services/generate-pdf.service";

@Component({
  selector: 'app-xmgoi-packing-list',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, XmgoiProductsTableComponent, MatIconModule, MatButtonModule],
  providers: [DatePipe],
  templateUrl: './xmgoi-packing-list.component.html',
  styleUrl: './xmgoi-packing-list.component.css'
})
export class XmgoiPackingListComponent implements OnChanges, OnInit {
  @Output() onPackingListChange: EventEmitter<any> = new EventEmitter()
  @Input() customerId: string = ''
  @Input() packingList: Smg13RowInterface[] = []
  @ViewChild('packingListContainer') packingListContainer!: ElementRef<HTMLDivElement>
  customerSocialReason: string = ''
  currentDateTime: string|null = ''

  constructor(
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private xmgoiApi: XmgoiApiService,
    private generatePdf: GeneratePdfService
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

  setPackingList(packingList: Smg13RowInterface[]) {
    this.packingList = packingList
    this.onPackingListChange.emit(packingList)
  }

  updateCustomerLastPurchaseDay() {
    console.log(this.customerId)
    this.xmgoiApi.updateCustomerLastPurchaseDay(this.customerId).subscribe(response => {
      if(response.error) {
        this.snackBar.open('Houve um erro ao registrar o romaneio', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000
        })

        return
      }

      this.snackBar.open('Romaneio registrado com sucesso', 'Fechar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000
      })
    })
  }

  generatePackingListPdf() {
    const html: HTMLDivElement = this.packingListContainer.nativeElement
    //@ts-ignore
    html.querySelector('.table-actions').style.display = "none"
    html.classList.remove('mat-elevation-z3')

    //@ts-ignore
    html.querySelectorAll('th,td:not(.barcode):not(.total-price)').forEach(element => element.style.fontSize = '1.3em')

    html.querySelectorAll<HTMLDivElement>('.input-wrapper').forEach(div => {
      const input = div.querySelector<HTMLInputElement>('input')

      const inputValue = input!.value
      const spanElement = document.createElement('span')

      spanElement.textContent = inputValue
      input!.style.display = 'none'
      div.style.display = 'flex'
      div.style.justifyContent = 'center'
      div.style.alignItems = 'center'
      div.appendChild(spanElement)
    })

    html.querySelectorAll(".barcode").forEach(barcode => {
      barcode.classList.remove('barcode')
      barcode.classList.add('big-barcode')
    })

    this.generatePdf.generatePdfFromHtml(html, `romaneio_${this.customerId}`)
    //@ts-ignore
    html.querySelector('.table-actions').style.display = "block"
    html.classList.add('mat-elevation-z3')

    html.querySelectorAll<HTMLDivElement>('.input-wrapper').forEach(div => {
      const input = div.querySelector<HTMLInputElement>('input')
      input!.style.display = 'block'

      div.querySelector('span')!.remove()
    })

    //@ts-ignore
    html.querySelectorAll('th,td:not(.barcode):not(.total-price)').forEach(element => element.style.fontSize = '1em')

    html.querySelectorAll(".big-barcode").forEach(barcode => {
      barcode.classList.remove('big-barcode')
      barcode.classList.add('barcode')
    })
  }
}
