import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SfondoComponent } from './sfondo/sfondo.component';

@Component({
  selector: 'FooterContatti',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SfondoComponent],
  templateUrl: './footer-contatti.component.html',
  styleUrl: './footer-contatti.component.scss'
})
export class FooterContattiComponent {

}
