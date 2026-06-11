import { Component } from '@angular/core';
import { EffettoMouseCartaDirective } from '../effetto-mouse-carta.directive';
import { CardASPComponent } from './card-asp/card-asp.component';
import { CardBackendComponent } from "./card-backend/card-backend.component";
import { CardFrontendComponent } from "./card-frontend/card-frontend.component";
import { CardPhpComponent } from "./card-php/card-php.component";

@Component({
    selector: 'GrigliaWeb',
    imports: [
      CardFrontendComponent,
      CardBackendComponent,
      CardPhpComponent,
      CardASPComponent,
      EffettoMouseCartaDirective,
    ],
    templateUrl: './griglia-web.component.html',
    styleUrls: ['../stile-griglie.scss', './griglia-web.component.scss']
})
export class GrigliaWebComponent {}
