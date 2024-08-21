import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, ViewChild } from '@angular/core';
import { ImmaginiService } from './immagini.service';

@Component({
  selector: 'Immagini',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './immagini.component.html',
  styleUrl: './immagini.component.scss'
})
export class ImmaginiComponent implements AfterViewInit{

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

  ngAfterViewInit(): void {
    const img = this.modaleImmagine.nativeElement.querySelector("img")!
    this.ZoomImagine(2, img);
  }

  ZoomImagine(zoom: number, img: HTMLImageElement) {
    img.addEventListener("load", CaricaImmagine)

    const lente = img.nextElementSibling! as HTMLDivElement;
    const bw = 3;
    const w = lente.offsetWidth / 2;
    const h = lente.offsetHeight / 2;

    lente.addEventListener("mousemove", (e) => MuoviLente(e, bw, w, h));
    img.addEventListener("mousemove",  (e) => MuoviLente(e, bw, w, h));

    img.addEventListener("mousedown", (e) => {
      e.preventDefault();
      MuoviLente(e, w, h, bw);
      lente.classList.add("visibile");
      img.addEventListener("wheel", Zoom)
    
      const Rimuovi = () => {
        lente.classList.remove("visibile")
        img.removeEventListener("wheel", Zoom)
      }
      
      document.addEventListener("mouseup", Rimuovi, { passive: true, once: true })
      img.addEventListener("mouseleave", Rimuovi, { passive: true, once: true })
    })

    // glass.addEventListener("touchmove", moveMagnifier);
    // img.addEventListener("touchmove", moveMagnifier);

    function MuoviLente(e: MouseEvent, w: number, h: number, bw: number) {
      let { x, y } = getCursorPos(e);
      const stiliCella = getComputedStyle(lente);
      const widthCella = parseFloat(stiliCella.width) - 2;
      const heightCella = parseFloat(stiliCella.height) - 2;
 
      x = Math.min(x, img.width - w / zoom + widthCella / 2)
      x = Math.max(x, w / zoom + widthCella / 2);

      y = Math.min(y, img.height - h / zoom + heightCella / 2)
      y = Math.max(y, h / zoom + heightCella / 2);

      lente.style.left = `${x - w}px`;
      lente.style.top =  `${y - h}px`;
      lente.style.backgroundPosition = `-${x * zoom - w + bw - widthCella / 2}px -${y * zoom - h + bw - heightCella / 2}px`;
    }

    function getCursorPos(e: MouseEvent) {
      const { pageX, pageY } = e;
      const { top, left, width, height } = img.getBoundingClientRect();
      
      const x = pageX - left - window.scrollX;
      const y = pageY - top - window.scrollY;

      return { x, y, width, height };
    }

    function CaricaImmagine(){
      lente.style.backgroundSize = `${img.width * zoom}px ${img.height * zoom}px`;
      lente.style.backgroundImage = `url(${img.src})`;
    }

    function Zoom(e: WheelEvent){
      if(e.deltaY < 0){
        zoom = Math.min(zoom + .25, 5)
      }
      else zoom = Math.max(zoom - .25, 1.5) 
      
      CaricaImmagine();
      MuoviLente(e, w, h, bw);
    }
  }
}
