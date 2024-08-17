import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AnimazioneTecnologie } from './tecnlogie.animation';
import { progetti, Progetto } from './dati';

@Component({
  selector: 'SezioneProgetti',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [AnimazioneTecnologie],
  templateUrl: './sezione-progetti.component.html',
  styleUrl: './sezione-progetti.component.scss'
})
export class SezioneProgettiComponent {

  progetti = progetti;
  progettoSelezionato = this.progetti[0];
  progettoPrecedente?: Progetto; 

  ApriLink(link: string){
    window.open(link, "_blank");
  }


  // Quando si cambia progetto il @for non
  // re-renderizza i div che erano già presenti
  // anche se il loro contenuto cambia
  // uso quindi questa variable per forzarlo
  resettaForTecnologie = true;
  puoCambiare = true;
  SelezionaProgetto(p: Progetto){
    if(!this.puoCambiare || p === this.progettoSelezionato) return;

    this.progettoPrecedente = this.progettoSelezionato;
    this.resettaForTecnologie = false;
    this.progettoSelezionato = p
    this.puoCambiare = false;

    setTimeout(() => {
      this.progettoPrecedente = undefined
      this.puoCambiare = true;
    }, 500);
    setTimeout(() => this.resettaForTecnologie = true, 1);
  }

  immagineCorrente: string = 'https://picsum.photos/600/600?random=1';
  SelezionaImmagine(e: Event){
    if(e.target === e.currentTarget) return;

    const img = e.target as HTMLImageElement;
    const cont = e.currentTarget as HTMLElement;

    cont.querySelectorAll("img").forEach((i) => {
      i.classList.toggle("selezionata", i === img)
    })

    this.immagineCorrente = img.src;
  }

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