import { Component } from '@angular/core';
import { XmgoiApiService } from "../../../services/xmgoi-api.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from "@angular/common";
import { MyFileUploadComponent } from '../../my-file-upload/my-file-upload.component';
import {
  MyTableComponent,
  DisplayedColumnInterface,
  TableDataInterface,
  ChangePageEvent
} from '../../my-table/my-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from "@angular/forms";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-xmgoi-database-manager',
  templateUrl: './xmgoi-database-manager.component.html',
  styleUrl: './xmgoi-database-manager.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MyFileUploadComponent,
    MyTableComponent,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class XmgoiDatabaseManagerComponent {
  private smg13File!: File
  public isSmg13Uploading: boolean = false
  public smg13TableColumns: DisplayedColumnInterface[] = [
    {def: 'productCode', text: 'Mercadoria'},
    {def: 'productDigit', text: "Dígito"},
    {def: 'productDescription', text: 'Descrição'},
    {def: 'productPacking', text: 'Embalagem'},
    {def: 'productStockEmb1', text: 'Estoque Emb1'},
    {def: 'productStockEmb9', text: 'Estoque Emb9'},
    {def: 'productSalePrice', text: 'Preço de Venda'}
  ]
  public smg13TableData!: TableDataInterface
  public smg13TableItemsPerPage = 30
  public smg13TableIsLoading: boolean = false
  public smg13TableOffset: number = 0

  constructor(
    private xmgoiApi: XmgoiApiService,
    private snackBar: MatSnackBar
  ) {
    this.setSmg13TableData()
  }

  private setSmg13TableData(term: string|undefined = undefined) {
    this.smg13TableIsLoading = true
    this.xmgoiApi.getSmgoi13Data(
      this.smg13TableOffset,
      this.smg13TableItemsPerPage,
      term
    ).subscribe(smgoi13Data => {
      this.smg13TableData = smgoi13Data

      this.smg13TableIsLoading = false
    })
  }

  smg13TableSearchTerm(changePageEvent: ChangePageEvent|undefined): void {
    if(!changePageEvent) {
      this.smg13TableOffset = 0
      this.setSmg13TableData()

      return
    }

    const {pageEvent, termValue} = changePageEvent
    this.smg13TableItemsPerPage = pageEvent.pageSize
    this.smg13TableOffset = pageEvent.pageIndex * this.smg13TableItemsPerPage
    this.setSmg13TableData(termValue)
  }

  smg13TableChangePage(changePageEvent: ChangePageEvent): void {
    const {pageEvent, termValue} = changePageEvent
    this.smg13TableItemsPerPage = pageEvent.pageSize
    this.smg13TableOffset = pageEvent.pageIndex * this.smg13TableItemsPerPage
    
    this.setSmg13TableData(termValue.toLocaleLowerCase())
  }

  onChangeFile(file: File): void {
    this.smg13File = file
  }

  submitForm(): void {
    const uploadRequest = this.xmgoiApi.updateSmgoi13(this.smg13File)
    this.isSmg13Uploading = true

    uploadRequest.subscribe(response => {
      if(!response.error) {
        this.snackBar.open('Dados atualizados', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000
        })

        this.setSmg13TableData()
      } else {
        this.snackBar.open('Ocorreu um erro durante o upload', 'Fechar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000
        })
      }

      this.isSmg13Uploading = false
    })
  }
}
