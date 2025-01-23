import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TableColumn } from 'src/app/shared/types/types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data = [];
  @Input() titulo: string;
  @Input() colunas: TableColumn[];
  @Input() acoesHeader: TemplateRef<any>;
  @Input() acoes: TemplateRef<any>;

  emptyColspan = 0;

  constructor() { }

  ngOnInit() {
    this.emptyColspan = this.acoes ? this.colunas.length + 1 : this.colunas.length;
  }

}
