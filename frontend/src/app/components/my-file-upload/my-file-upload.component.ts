import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-my-file-upload',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatIconModule, MatButtonModule],
  templateUrl: './my-file-upload.component.html',
  styleUrl: './my-file-upload.component.css'
})
export class MyFileUploadComponent {
  @Output() changeFile: EventEmitter<any> = new EventEmitter()
  filename: string = ''

  onFileSelected(event: any): void {
    const file: File = event.target.files[0]

    if(file) {
      this.filename = file.name

      this.changeFile.emit(file)
    }
  }
}
