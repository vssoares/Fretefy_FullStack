import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Regiao, SelectItems } from '../types/types';
import { saveAsExcelFile } from '../utils/utils';
import * as xlsx  from 'xlsx';

@Injectable({providedIn: 'root'})
export class GestaoRegioesService {

  private apiUrl = environment.api

  constructor(private http: HttpClient) {}

  // será preciso rodar o json-server: npm run api
  // Informações sobre o json-server na Readme.md do repositorio front-end

  buscarRegioes(): Observable<Regiao[]> {
    return this.http.get<Regiao[]>(this.apiUrl + 'regioes');
  }

  buscarRegiao(id: string): Observable<Regiao> {
    return this.http.get<Regiao>(this.apiUrl + `regioes/${id}`);
  }

  buscarCidades(): Observable<SelectItems[]> {
    return this.http.get<SelectItems[]>(this.apiUrl + 'cidades');
  }

  cadastrarRegiao(regiao: Regiao): Observable<Regiao> {
    if (regiao.id) {
      return this.http.put<Regiao>(this.apiUrl + `regioes/${regiao.id}`, regiao);
    }
    return this.http.post<Regiao>(this.apiUrl + 'regioes', regiao);
  }

  toggleRegiao(id: string, regiao: Regiao): Observable<Regiao> {
    return this.http.patch<Regiao>(this.apiUrl + `regioes/${id}`, regiao);
  }

  excluirRegiao(id: string): Observable<Regiao> {
    return this.http.delete<Regiao>(this.apiUrl + `regioes/${id}`);
  }

  exportarRegioes():void {
    this.buscarRegioes().subscribe({
      next: (regioes: any) => {
        this.buscarCidades().subscribe({
          next: (cidades: any) => {
            const regioesFormatadas = regioes.map(regiao => {
              return {
                ...regiao,
                ativa: regiao.ativa ? 'Sim' : 'Não',
                locais: regiao.locais.map(local => {
                  local = cidades.find(cidade => cidade.value == local.cidade).label
                  return local
                }).join(', ')
              }
            })

            const worksheet = xlsx.utils.json_to_sheet(regioesFormatadas);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
            const excelBuffer: any = xlsx.write(workbook, {
              bookType: "xlsx",
              type: "array",
            });
            saveAsExcelFile(excelBuffer, 'Regiões');
          }
        });
      }
    })
  }
}