import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { TableColumn } from 'src/core/types/types';

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

  constructor() { }

  ngOnInit() {
  }

}
