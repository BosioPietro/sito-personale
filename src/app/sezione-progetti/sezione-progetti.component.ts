import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { progetti, Progetto } from './dati';
import { TecnologieComponent } from "./tecnologie/tecnologie.component";
import { DescrizioneComponent } from "./descrizione/descrizione.component";
import { SelettoreProgettiComponent } from "./selettore-progetti/selettore-progetti.component";
import { ImmaginiComponent } from "./immagini/immagini.component";
import { ImmaginiService } from './immagini/immagini.service';

@Component({
  selector: 'SezioneProgetti',
  standalone: true,
  imports: [TecnologieComponent, DescrizioneComponent, SelettoreProgettiComponent, ImmaginiComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sezione-progetti.component.html',
  styleUrl: './sezione-progetti.component.scss'
})
export class SezioneProgettiComponent {

  constructor(private img: ImmaginiService) {}

  @ViewChild("descrizione")
  descrizione!: ElementRef<HTMLElement>;

  progetti = progetti;
  progettoSelezionato = this.progetti[0];
  progettoPrecedente?: Progetto; 

  espandiMenu: boolean = false;

  ApriLink(link: string){
    window.open(link, "_blank");
  }

  // Quando si cambia progetto il @for non
  // re-renderizza i div che erano già presenti
  // anche se il loro contenuto cambia
  // uso quindi questa variable per forzarlo
  resettaFor = true;
  puoCambiare = true;
  SelezionaProgetto(p: Progetto){
    this.progettoPrecedente = this.progettoSelezionato;
    this.resettaFor = false;
    this.progettoSelezionato = p
    this.puoCambiare = false;

    this.img.immaginePrecedente = this.img.immagineSelezionata;
    this.img.immagineSelezionata = 0

    const desc = this.descrizione.nativeElement.querySelector("descrizione")!;
    desc.scrollTo({
      top: 0,
      behavior: "smooth"
    })

    setTimeout(() => {
      this.progettoPrecedente = undefined;
      this.img.immaginePrecedente = undefined;
      this.puoCambiare = true;
    }, 500);
    setTimeout(() => this.resettaFor = true, 1);
  }
}