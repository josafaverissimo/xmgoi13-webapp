import { Component, ViewChild } from '@angular/core';
import { CustomersTableComponent } from '../customers-table/customers-table.component';

@Component({
  selector: 'app-customers-page',
  templateUrl: './customers-page.component.html',
  styleUrl: './customers-page.component.css'
})
export class CustomersPageComponent {
  @ViewChild('appCustomersTable', {static: false}) customersTable!: CustomersTableComponent

  refreshCustomerTable() {
    this.customersTable.refreshTableData()
  }
}
