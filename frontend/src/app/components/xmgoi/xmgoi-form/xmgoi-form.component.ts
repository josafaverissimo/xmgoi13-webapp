import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-xmgoi-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    NgxMaskDirective,
    MatAutocompleteModule,
    FormsModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './xmgoi-form.component.html',
  styleUrl: './xmgoi-form.component.css'
})
export class XmgoiFormComponent {
  productIdInput: string = ''
}
