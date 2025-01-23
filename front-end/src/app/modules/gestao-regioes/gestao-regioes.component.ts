import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routeAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-gestao-regioes',
  templateUrl: './gestao-regioes.component.html',
  styleUrl: './gestao-regioes.component.scss',
  standalone: true,
  animations: [routeAnimation],
  imports: [RouterModule],
})
export class GestaoRegioesComponent {

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

}
