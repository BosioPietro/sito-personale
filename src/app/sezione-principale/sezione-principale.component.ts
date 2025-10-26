import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { SfondoComponent } from './sfondo/sfondo.component';

@Component({
    selector: 'SezionePrincipale',
    imports: [SfondoComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './sezione-principale.component.html',
    styleUrl: './sezione-principale.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SezionePrincipaleComponent {
  Scrolla(){
    const cont = document.getElementById("conoscenze")!;
    cont.scrollIntoView({ behavior: "smooth" })
  }
}
