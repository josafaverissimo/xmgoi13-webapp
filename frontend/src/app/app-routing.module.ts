import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {XmgoiPageComponent} from "./components/xmgoi/xmgoi-page/xmgoi-page.component";
import {CustomersPageComponent} from "./components/customers/customers-page/customers-page.component";
import {
  XmgoiDatabaseManagerComponent
} from "./components/xmgoi/xmgoi-database-manager/xmgoi-database-manager.component";

const routes: Routes = [
  {path: '', component: XmgoiPageComponent},
  {path: 'customers', component: CustomersPageComponent},
  {path: 'database', component: XmgoiDatabaseManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
