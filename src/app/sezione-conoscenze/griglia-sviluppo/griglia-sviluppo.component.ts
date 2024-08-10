import { Component } from '@angular/core';
import { EffettoMouse } from '../sezione-conoscenze.component';

@Component({
  selector: 'GrigliaSviluppo',
  standalone: true,
  imports: [],
  templateUrl: './griglia-sviluppo.component.html',
  styleUrl: './griglia-sviluppo.component.scss'
})
export class GrigliaSviluppoComponent {
  EffettoMouse = EffettoMouse;
}
