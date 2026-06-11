import { Component } from '@angular/core';
import { SfondoComponent } from './sfondo/sfondo.component';
import { IconaComponent } from '../common/icona/icona.component';

@Component({
  selector: 'FooterContatti',
  imports: [SfondoComponent, IconaComponent],
  templateUrl: './footer-contatti.component.html',
  styleUrl: './footer-contatti.component.scss',
})
export class FooterContattiComponent {}
