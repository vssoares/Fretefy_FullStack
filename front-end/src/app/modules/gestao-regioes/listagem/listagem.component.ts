import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { GestaoRegioesService } from '../gestao-regioes.service';
import { Regiao, TableColumn } from 'src/app/shared/types/types';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
  imports: [
    CommonModule,
    TableModule,
    RouterModule,
  ],
  standalone: true
})
export class ListagemComponent implements OnInit, OnDestroy {
  private gestaoRegioesService: GestaoRegioesService = inject(GestaoRegioesService);

  colunas: TableColumn[] = []
  regioes$: Observable<Regiao[]> = this.gestaoRegioesService.buscarRegioes()

  subs: Subscription[] = [];

  constructor(
  ) { }

  ngOnInit() {
    this.inicializarTabela();
  }

  inicializarTabela() {
    this.colunas = [
      { dataField: 'nome', caption: 'Nome Região', tipo: 'string' },
      { dataField: 'ativa', caption: 'Status', tipo: 'ativaInativa' },
    ]
  }

  exportarRegioes() {
    this.gestaoRegioesService.exportarRegioes()
  }

  toggleRegiao(regiao: Regiao, ativa: boolean) {
    regiao.ativa = ativa;
    this.subs.push(
      this.gestaoRegioesService.toggleRegiao(regiao.id, regiao).subscribe()
    )
  }

  excluirRegiao(regiao: Regiao) {
    if (!confirm('Deseja realmente excluir esta região?')) {
      return;
    }

    this.subs.push(
      this.gestaoRegioesService.excluirRegiao(regiao.id).subscribe({
        next: () => {
          this.regioes$ = this.gestaoRegioesService.buscarRegioes()
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subs?.forEach(sub => sub.unsubscribe())
  }
}
