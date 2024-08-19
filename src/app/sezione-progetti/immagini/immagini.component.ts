import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, ViewChild } from '@angular/core';
import { ImmaginiService } from './immagini.service';

@Component({
  selector: 'Immagini',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  @ViewChild("modale")
  modaleImmagine!: ElementRef<HTMLDialogElement>;

  immagineVisualizzata?: string;

  SelezionaImmagine(e: Event){
    if(e.target === e.currentTarget) return;

    const img = e.target as HTMLImageElement;
    const cont = e.currentTarget as HTMLElement;

    cont.querySelectorAll("img").forEach((i) => {
      i.classList.toggle("selezionata", i === img)
    })

    this.img.immagineSelezionata = parseInt(img.src.split("/").at(-1)!);
  }

  ApriModaleImmagine(img: number){
    this.immagineVisualizzata = this.immaginiCorrenti[img];

    const modale = this.modaleImmagine.nativeElement;
    modale.showModal();
  }

  ChiudiModale(){
    
    const modale = this.modaleImmagine.nativeElement;
    modale.close();
  }
}
