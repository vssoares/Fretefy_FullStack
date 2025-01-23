import { NgModule } from '@angular/core';
import { GestaoRegiaoRoutingModule } from './gestao-regioes.routing';
import { GestaoRegioesComponent } from './gestao-regioes.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule,
    GestaoRegiaoRoutingModule,

    // standalones
    GestaoRegioesComponent
  ]
})
export class GestaoRegioesModule { }
