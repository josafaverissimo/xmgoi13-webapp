import {
  Component,
  Input,
  ViewChild,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {CustomMatPaginatorIntl} from "../../shared/custom-mat-paginator-intl";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-my-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [{
    provide: MatPaginatorIntl,
    useClass: CustomMatPaginatorIntl
  }],
  templateUrl: './my-table.component.html',
  styleUrl: './my-table.component.css'
})
export class MyTableComponent implements OnInit, AfterViewInit {
  @Output() changePage: EventEmitter<any> = new EventEmitter()
  @Output() searchTerm: EventEmitter<any> = new EventEmitter()
  @Input() displayedColumns: DisplayedColumnInterface[] = []
  @Input() dataSource!: TableDataInterface
  @Input() itemsPerPage: number = 0
  @Input() isLoading: boolean = false
  @ViewChild(MatPaginator) paginator!: MatPaginator

  public offset = 0
  public columnsNameList: string[] = []
  public searchInput: string = ''
  private lastSearchInput: string = ''
  private searchTermValue: string = ''

  ngOnInit(): void {
    this.dataSource = {
      totalRows: 0,
      data: []
    }
    this.setColumnsNameList()
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      if(this.searchTermValue !== this.lastSearchInput) {
        this.paginator.pageIndex = 0
      }

      this.changePage.emit({
        pageEvent: this.paginator,
        termValue: this.searchTermValue
      })
    })
  }

  private setColumnsNameList(): void {
    this.columnsNameList = this.displayedColumns.reduce((columnsName: string[], column: DisplayedColumnInterface) => {
      return [...columnsName, column.def]
    }, [])
  }

  searchTermHandler(): void {
    this.searchTermValue = this.searchInput

    if(this.searchTermValue !== this.lastSearchInput) {
      this.paginator.pageIndex = 0
      this.lastSearchInput = this.searchTermValue
    }

    this.searchTerm.emit({
      pageEvent: this.paginator,
      termValue: this.searchTermValue
    })
  }

  clearTerm(): void {
    this.searchInput = ''
    this.searchTerm.emit()
  }
}

export interface ChangePageEvent {
  pageEvent: PageEvent;
  termValue: string
}

export interface DisplayedColumnInterface {
  def: string;
  text: string;
}

export interface TableDataInterface {
  totalRows: number;
  data: any[];
}
