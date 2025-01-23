import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GestaoRegioesService } from 'src/app/modules/gestao-regioes/gestao-regioes.service';


@Injectable({
  providedIn: 'root'
})
export class RegiaoResolverService implements Resolve<any> {
  private gestarRegioesService: GestaoRegioesService = inject(GestaoRegioesService);
  private router: Router = inject(Router);

  constructor() {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.gestarRegioesService.buscarRegiao(id).pipe(
      catchError(error => {
        this.router.navigate(['/gestao-regioes/cadastro']);
        return of('No data');
      })
    );
  }
}
