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
import { XmgoiApiService } from "../../services/xmgoi-api.service";
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {CustomMatPaginatorIntl} from "../../shared/custom-mat-paginator-intl";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


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
    MatButtonModule
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
  @ViewChild('searchInput') searchInput: any

  public offset = 0
  public columnsNameList: string[] = []

  constructor(private xmgoiApi: XmgoiApiService) {}

  ngOnInit(): void {
    this.dataSource = {
      totalRows: 0,
      data: []
    }
    this.setColumnsNameList()
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.changePage.emit({
        pageEvent: event,
        termValue: this.getTermValue()
      })
    })
  }

  private setColumnsNameList(): void {
    this.columnsNameList = this.displayedColumns.reduce((columnsName: string[], column: DisplayedColumnInterface) => {
      return [...columnsName, column.def]
    }, [])
  }

  private getTermValue(): string {
    return this.searchInput.nativeElement.value
  }

  searchTermHandler(): void {
    const value = this.getTermValue()
    this.searchTerm.emit(value)
  }

  clearTerm(): void {
    this.searchInput.nativeElement.value = ''
    this.searchTerm.emit('')
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
