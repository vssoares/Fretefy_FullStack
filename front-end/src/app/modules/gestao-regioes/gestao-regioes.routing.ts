import { RouterModule, Routes } from '@angular/router';
import { ListagemComponent } from './listagem/listagem.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { RegiaoGuard } from 'src/app/shared/guards/regiao-desativada.guard';
import { RegiaoResolverService } from 'src/app/shared/resolvers/regiao.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listagem',
    pathMatch: 'full',
  },
  {
    path: 'listagem',
    component: ListagemComponent,
    data: { animation: 'RegiaoListagem' }
  },
  {
    path: 'regiao',
    children: [
      {
        path: '',
        redirectTo: 'cadastro',
        pathMatch: 'full',
      },
      {
        path: 'cadastro',
        component: CadastroComponent,
        data: { animation: 'RegiaoCadastro' }
      },
      {
        path: ':id',
        component: CadastroComponent,
        // canActivate: [RegiaoGuard],
        data: { animation: 'RegiaoCadastro' },
        resolve: {
          regiao: RegiaoResolverService
        }
      },
      {
        path: '**',
        redirectTo: 'cadastro',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'listagem',
    pathMatch: 'full',
  }
];

export const GestaoRegiaoRoutingModule = RouterModule.forChild(routes);
