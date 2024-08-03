import { Component } from '@angular/core';
import { SwitchComponent } from './switch/switch.component';
import { SfondoComponent } from './sfondo/sfondo.component';

@Component({
  selector: 'SezioneConoscenze',
  standalone: true,
  schemas: [],
  imports: [SwitchComponent, SfondoComponent],
  templateUrl: './sezione-conoscenze.component.html',
  styleUrl: './sezione-conoscenze.component.scss'
})
export class SezioneConoscenzeComponent {

  EffettoMouse(e: MouseEvent){
    const cont = e.currentTarget as HTMLElement;
    const celle = Array.from(cont.children) as HTMLElement[];
    const { clientX, clientY } = e;

    for(const cella of celle) {
      const { left, top } = cella.getBoundingClientRect();
  
      cella.style.setProperty("--mouse-x", `${clientX - left}px`);
      cella.style.setProperty("--mouse-y", `${clientY - top}px`);
    };
  }

}
