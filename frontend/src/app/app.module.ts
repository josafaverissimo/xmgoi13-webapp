import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { XmgoiPageComponent } from './components/xmgoi/xmgoi-page/xmgoi-page.component';
import { XmgoiFormComponent } from "./components/xmgoi/xmgoi-form/xmgoi-form.component";
import { HeaderComponent } from "./components/header/header.component";
import { CustomersPageComponent } from './components/customers/customers-page/customers-page.component';
import { XmgoiDatabaseManagerComponent } from './components/xmgoi/xmgoi-database-manager/xmgoi-database-manager.component';
import { MyFileUploadComponent } from "./components/my-file-upload/my-file-upload.component";
import { MyTableComponent } from "./components/my-table/my-table.component";



@NgModule({
  declarations: [
    AppComponent,
    XmgoiPageComponent,
    CustomersPageComponent,
    XmgoiDatabaseManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    XmgoiFormComponent,
    HeaderComponent,
    MyFileUploadComponent,
    MyTableComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }