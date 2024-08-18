import { Component, Input } from '@angular/core';
import { Progetto } from '../dati';

@Component({
  selector: 'Descrizione',
  standalone: true,
  imports: [],
  templateUrl: './descrizione.component.html',
  styleUrl: './descrizione.component.scss'
})
export class DescrizioneComponent {

  
  @Input("progetto-selezionato")
  progettoSelezionato!: Progetto;

  @Input("progetto-precedente")
  progettoPrecedente?: Progetto;

  @Input("resetta-for")
  resettaFor!: boolean;

  // | testo-gradient
  // # codice
  // § link
  TraduciHtml(s: string){
    const gradient = new RegExp("\\|(.+?)\\|", "g")
    const codice = new RegExp("#(.+?)#", "g");
    const link = new RegExp("§(.+?)§", "g");

    s = s.replace(gradient, (_, m) => `<span class="testo-gradient">${m}</span>`);
    s = s.replace(codice, (_, m) => `<code>${m}</code>`);
    s = s.replace(link, (_, m) => `<a href="${m}">${m.replace("https://", "")}</a>`)

    return s;
  }
}
