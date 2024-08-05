import { Component } from '@angular/core';
import { EffettoMouse } from '../sezione-conoscenze.component';
import { CardFrontendComponent } from "./card-frontend/card-frontend.component";
import { CardBackendComponent } from "./card-backend/card-backend.component";
import { CardPhpComponent } from "./card-php/card-php.component";

@Component({
  selector: 'GrigliaWeb',
  standalone: true,
  imports: [CardFrontendComponent, CardBackendComponent, CardPhpComponent],
  templateUrl: './griglia-web.component.html',
  styleUrl: './griglia-web.component.scss'
})
export class GrigliaWebComponent{
  EffettoMouse = EffettoMouse;
}
