import { Component } from '@angular/core';
import { SfondoComponent } from './sfondo/sfondo.component';

@Component({
  selector: 'SezionePrincipale',
  standalone: true,
  imports: [SfondoComponent],
  templateUrl: './sezione-principale.component.html',
  styleUrl: './sezione-principale.component.scss'
})
export class SezionePrincipaleComponent {

}
