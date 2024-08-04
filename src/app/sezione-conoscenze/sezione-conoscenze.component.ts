import { Component } from '@angular/core';
import { SwitchComponent } from './switch/switch.component';
import { SfondoComponent } from './sfondo/sfondo.component';
import { GrigliaWebComponent } from './griglia-web/griglia-web.component';

@Component({
  selector: 'SezioneConoscenze',
  standalone: true,
  schemas: [],
  imports: [SwitchComponent, SfondoComponent, GrigliaWebComponent],
  templateUrl: './sezione-conoscenze.component.html',
  styleUrl: './sezione-conoscenze.component.scss'
})
export class SezioneConoscenzeComponent {
  EffettoMouse = EffettoMouse;

}


// funzione per l'effetto delle singole carte
export const EffettoMouse = (e: MouseEvent) => {
  const cont = e.currentTarget as HTMLElement;
  const celle = Array.from(cont.children) as HTMLElement[];
  const { clientX, clientY } = e;

  for(const cella of celle) {
    const { left, top } = cella.getBoundingClientRect();

    cella.style.setProperty("--mouse-x", `${clientX - left}px`);
    cella.style.setProperty("--mouse-y", `${clientY - top}px`);
  };
}