import { Component, Input } from '@angular/core';
import { ImmaginiService } from './immagini.service';

@Component({
  selector: 'Immagini',
  standalone: true,
  imports: [],
  templateUrl: './immagini.component.html',
  styleUrl: './immagini.component.scss'
})
export class ImmaginiComponent {

  constructor(protected img: ImmaginiService){}

  @Input("immagini-correnti")
  immaginiCorrenti!: string[];

  @Input("immagini-precedenti")
  immaginiPrecendenti?: string[];

  @Input("resetta-for")
  resettaFor!: boolean;

  SelezionaImmagine(e: Event){
    if(e.target === e.currentTarget) return;

    const img = e.target as HTMLImageElement;
    const cont = e.currentTarget as HTMLElement;

    cont.querySelectorAll("img").forEach((i) => {
      i.classList.toggle("selezionata", i === img)
    })

    this.img.immagineSelezionata = parseInt(img.src.split("/").at(-1)!);
  }
}
