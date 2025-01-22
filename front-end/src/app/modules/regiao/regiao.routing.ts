import { RouterModule, Routes } from '@angular/router';
import { RegiaoComponent } from './regiao.component';
import { RegiaoGuard } from 'src/core/guards/regiao-desativada.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cadastro',
    pathMatch: 'full',
    data: { animation: 'Regiao' }
  },
  {
    path: 'cadastro',
    component: RegiaoComponent,
    data: { animation: 'Regiao' }
  },
  {
    path: ':id',
    component: RegiaoComponent,
    canActivate: [RegiaoGuard],
    data: { animation: 'Regiao' }
  },
  {
    path: '**',
    redirectTo: 'cadastro',
    pathMatch: 'full',
    data: { animation: 'Regiao' }
  }
];

export const  RegiaoRoutingModule = RouterModule.forChild(routes);
