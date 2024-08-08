import { Component } from '@angular/core';
import { transizioneGriglie } from './celle.animation';
import { GrigliaCertificazioniComponent } from './griglia-certificazioni/griglia-certificazioni.component';
import { GrigliaWebComponent } from './griglia-web/griglia-web.component';
import { SfondoComponent } from './sfondo/sfondo.component';
import { Sezioni, SwitchComponent } from './switch/switch.component';
import { GrigliaSviluppoComponent } from './griglia-sviluppo/griglia-sviluppo.component';

@Component({
  selector: 'SezioneConoscenze',
  standalone: true,
  imports: [SwitchComponent, SfondoComponent, GrigliaWebComponent, GrigliaCertificazioniComponent, GrigliaSviluppoComponent],
  animations: [transizioneGriglie],
  templateUrl: './sezione-conoscenze.component.html',
  styleUrl: './sezione-conoscenze.component.scss'
})
export class SezioneConoscenzeComponent{
  EffettoMouse = EffettoMouse;
  // per portare l'enum nel componente
  Sezioni = Sezioni;

  sezioneCorrente: Sezioni = Sezioni.Web;

  CambiaSezione(s: Sezioni){
    this.sezioneCorrente = s;
  }
}


// funzione per l'effetto delle singole carte
export const EffettoMouse = (e: MouseEvent) => {
  const cont = e.currentTarget as HTMLElement;
  const celle = Array.from<HTMLElement>(cont.querySelectorAll(".card"));

  const { clientX, clientY } = e;

  for(const cella of celle) {
    const { left, top } = cella.getBoundingClientRect();

    cella.style.setProperty("--mouse-x", `${clientX - left}px`);
    cella.style.setProperty("--mouse-y", `${clientY - top}px`);
  };
}