import { Component } from '@angular/core';
import { SwitchComponent } from './switch/switch.component';
import { SfondoComponent } from './sfondo/sfondo.component';

@Component({
  selector: 'SezioneConoscenze',
  standalone: true,
  imports: [SwitchComponent, SfondoComponent],
  templateUrl: './sezione-conoscenze.component.html',
  styleUrl: './sezione-conoscenze.component.scss'
})
export class SezioneConoscenzeComponent {

}
