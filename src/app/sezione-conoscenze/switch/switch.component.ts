import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'Switch',
  standalone: true,
  imports: [],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss', 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwitchComponent {

  @ViewChild("web")
  opzione_web!: ElementRef<HTMLElement>;

  @ViewChild("cella")
  cella!: ElementRef<HTMLElement>;

  async Seleziona(e: Event | HTMLElement){
    const el = e instanceof Event ? e.currentTarget! as HTMLElement : e;
    const cella = this.cella.nativeElement;

    // Tiene conto della width iniziale della cella
    this.ImpostaWidthCella(cella);
    Object.assign(cella, {bottone: el});
    
    const w = getComputedStyle(el).width;
    const sinistra = el.offsetLeft;

    cella.style.width = w;
    cella.style.left = `${sinistra}px`;
    
    el.parentNode!.childNodes.forEach((b) => {
      (b as HTMLElement).classList.remove("selezionato", "anima")
    })

    el.classList.add("selezionato", "anima");
  }

  ImpostaWidthCella(cella: any){
    const bottone = cella.bottone as HTMLElement || this.opzione_web.nativeElement;
    const w = getComputedStyle(bottone).width;
    const sinistra = bottone.offsetLeft;
    
    cella.classList.add("no-transizione")
    cella.style.width = w;
    cella.style.left = `${sinistra}px`;
    cella.classList.remove("no-transizione")
  }
}
