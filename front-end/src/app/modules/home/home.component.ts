import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GestaoRegioesService } from 'src/core/services/gestao-regioes.service';
import { Regiao, TableColumn } from 'src/core/types/types';
import { saveAsExcelFile } from 'src/core/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  colunas: TableColumn[] = []
  regioes$: Observable<Regiao[]> = this.gestaoRegioesService.buscarRegioes()

  subs: Subscription[] = [];

  constructor(
    private gestaoRegioesService: GestaoRegioesService
  ) { }

  ngOnInit() {
    this.inicializarTabela();
  }

  inicializarTabela() {
    this.colunas = [
      { dataField: 'nome', caption: 'Nome Região', tipo: 'string' },
      { dataField: 'ativa', caption: 'Ativa', tipo: 'boolean' },
    ]
  }

  exportarRegioes() {
    this.gestaoRegioesService.exportarRegioes()
  }

  toggleRegiao(regiao: Regiao, ativa: boolean) {
    regiao.ativa = ativa;
    this.subs.push(
      this.gestaoRegioesService.toggleRegiao(regiao.id, regiao).subscribe({
        next: () => {
          regiao.ativa = ativa;
        }
      })
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
