import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();

    this.getAndInitTranslations();
  }

  getAndInitTranslations() {

    this.itemsPerPageLabel = "Linhas por página";
    this.nextPageLabel = "Próxima";
    this.previousPageLabel = "Anterior";
    this.firstPageLabel = "Primeira Página"
    this.lastPageLabel = "Última Página"
    this.changes.next();
  }
}
