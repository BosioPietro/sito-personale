import { Component, Input } from '@angular/core';
import { transizioneGriglie } from '../celle.animation';

@Component({
  selector: 'GrigliaCertificazioni',
  standalone: true,
  imports: [],
  animations: [transizioneGriglie],
  templateUrl: './griglia-certificazioni.component.html',
  styleUrl: './griglia-certificazioni.component.scss'
})
export class GrigliaCertificazioniComponent {

  @Input("deve-sparire")
  rimuovi!: boolean;
}
