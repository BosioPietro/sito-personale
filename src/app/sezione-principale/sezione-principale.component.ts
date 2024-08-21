import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SfondoComponent } from './sfondo/sfondo.component';

@Component({
  selector: 'SezionePrincipale',
  standalone: true,
  imports: [SfondoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sezione-principale.component.html',
  styleUrl: './sezione-principale.component.scss'
})
export class SezionePrincipaleComponent {
  Scrolla(){
    const cont = document.getElementById("conoscenze")!;
    cont.scrollIntoView({ behavior: "smooth" })
  }
}
