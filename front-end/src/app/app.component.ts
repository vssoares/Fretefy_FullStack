import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimation } from 'src/core/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimation]
})
export class AppComponent {
  title = 'fretefy-fullstack';

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
