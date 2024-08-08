import { Component, Input } from '@angular/core';
import { EffettoMouse } from '../sezione-conoscenze.component';
import { CardASPComponent } from './card-asp/card-asp.component';
import { CardBackendComponent } from "./card-backend/card-backend.component";
import { CardFrontendComponent } from "./card-frontend/card-frontend.component";
import { CardPhpComponent } from "./card-php/card-php.component";

@Component({
  selector: 'GrigliaWeb',
  standalone: true,
  imports: [CardFrontendComponent, CardBackendComponent, CardPhpComponent, CardASPComponent],
  templateUrl: './griglia-web.component.html',
  styleUrl: './griglia-web.component.scss'
})
export class GrigliaWebComponent{
  EffettoMouse = EffettoMouse;
}
