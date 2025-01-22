import { Observable, Subscription } from "rxjs";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { GestaoRegioesService } from "../services/gestao-regioes.service";

@Injectable({ providedIn: "root" })
export class RegiaoGuard {
  private sub: Subscription;

  idRegiao: string;

  constructor(
    private router: Router,
    private gestaoRegioesService: GestaoRegioesService
  ) { }

  private verificaRegiaoAtiva(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean> | boolean {
    const regiaoAtiva$ = new Observable<boolean>(observer => {
      if (this.sub) {
        this.sub.unsubscribe();
      }
      this.idRegiao = activatedRoute.params.id;

      this.sub = this.gestaoRegioesService.buscarRegiao(this.idRegiao).subscribe({
        next: (regiao) => {
          if (!regiao?.ativa) {
            this.router.navigate(["/home"]);
          }

          observer.next(regiao?.ativa);
          observer.complete();
        }
      });
    });
    return regiaoAtiva$;
  }

  canActivate(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean> | boolean {
    return this.verificaRegiaoAtiva(activatedRoute);
  }

  canActivateChild(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean> | boolean {
    return this.verificaRegiaoAtiva(activatedRoute);
  }

  canLoad(): boolean {
    return false;
  }
}
