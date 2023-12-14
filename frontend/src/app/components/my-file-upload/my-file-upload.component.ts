import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-my-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-file-upload.component.html',
  styleUrl: './my-file-upload.component.css'
})
export class MyFileUploadComponent {
  @Output() changeFile: EventEmitter<any> = new EventEmitter()
  file: File|undefined

  constructor(private snackBar: MatSnackBar) {}

  private changeFilenameAndEmitEvent(file: File): void {
    if(!file) {
      this.snackBar.open('O arquivo não foi enviado :(', 'Fechar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000
      })
      return
    }

    this.file = file
    this.changeFile.emit(file)
  }

  private getFileSizeMB(): number|undefined {
    if(!this.file) return undefined

    return this.file.size / 1024 / 1024
  }

  getFileSizeMBFormatted(): string|undefined {
    const fileSizeMB = this.getFileSizeMB()

    return fileSizeMB ? `${fileSizeMB.toFixed(2)}MB` : ''
  }

  onDrop(event: any) {
    event.preventDefault()

    const file = event.dataTransfer.files[0]

    this.changeFilenameAndEmitEvent(file)
  }

  onDragOver(event: any) {
    event.stopPropagation()
    event.preventDefault()
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0]

    this.changeFilenameAndEmitEvent(file)
  }

  protected readonly ondragover = ondragover;
}
