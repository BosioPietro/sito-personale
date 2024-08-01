import { Component } from '@angular/core';
import { SwitchComponent } from './switch/switch.component';
import { SfondoComponent } from './sfondo/sfondo.component';

@Component({
  selector: 'PaginaConoscenze',
  standalone: true,
  imports: [SwitchComponent, SfondoComponent],
  templateUrl: './pagina-conoscenze.component.html',
  styleUrl: './pagina-conoscenze.component.scss'
})
export class PaginaConoscenzeComponent {

}
