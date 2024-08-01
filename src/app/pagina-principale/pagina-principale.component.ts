import { Component } from '@angular/core';
import { SfondoComponent } from './sfondo/sfondo.component';

@Component({
  selector: 'PaginaPrincipale',
  standalone: true,
  imports: [SfondoComponent],
  templateUrl: './pagina-principale.component.html',
  styleUrl: './pagina-principale.component.scss'
})
export class PaginaPrincipaleComponent {

}
