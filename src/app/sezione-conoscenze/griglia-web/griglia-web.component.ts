import { Component, Input, OnDestroy } from '@angular/core';
import { EffettoMouse } from '../sezione-conoscenze.component';
import { CardFrontendComponent } from "./card-frontend/card-frontend.component";
import { CardBackendComponent } from "./card-backend/card-backend.component";
import { CardPhpComponent } from "./card-php/card-php.component";
import { CardASPComponent } from './card-asp/card-asp.component';
import { transizioneGriglie, TEMPO_ANIMAZIONE_GRIGLIA } from '../celle.animation';

@Component({
  selector: 'GrigliaWeb',
  standalone: true,
  imports: [CardFrontendComponent, CardBackendComponent, CardPhpComponent, CardASPComponent],
  templateUrl: './griglia-web.component.html',
  styleUrl: './griglia-web.component.scss',
  animations: [transizioneGriglie]
})
export class GrigliaWebComponent{
  EffettoMouse = EffettoMouse;

  @Input("deve-sparire")
  rimuoviCard!: boolean;
}
