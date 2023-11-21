import { Component } from '@angular/core';
import { XmgoiApiService } from "../../../services/xmgoi-api.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-xmgoi-database-manager',
  templateUrl: './xmgoi-database-manager.component.html',
  styleUrl: './xmgoi-database-manager.component.css'
})
export class XmgoiDatabaseManagerComponent {

  constructor(
    private xmgoiApi: XmgoiApiService,
    private snackBar: MatSnackBar
  ) {}

  onChangeFile(file: File): void {
    const uploadRequest = this.xmgoiApi.updateSmgoi13(file)

    uploadRequest.subscribe(response => {
      this.snackBar.open('Dados atualizados', 'Fechar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000
      })
    })
  }
}
