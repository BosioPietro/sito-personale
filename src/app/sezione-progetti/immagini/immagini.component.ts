import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { ImmaginiService } from './immagini.service';
import { IconaComponent } from '../../common/icona/icona.component';

@Component({
  selector: 'Immagini',
  imports: [IconaComponent],
  templateUrl: './immagini.component.html',
  styleUrl: './immagini.component.scss',
})
export class ImmaginiComponent implements AfterViewInit {
  @Input('immagini-correnti')
  immaginiCorrenti!: string[];

  @Input('immagini-precedenti')
  immaginiPrecendenti?: string[];

  @Input('resetta-for')
  resettaFor!: boolean;

  @ViewChild('modale')
  modaleImmagine!: ElementRef<HTMLDialogElement>;

  protected readonly img: ImmaginiService = inject(ImmaginiService);
  protected isFirstLoad: boolean = true;

  protected immagineVisualizzata?: string;

  ngAfterViewInit(): void {
    this.isFirstLoad = false;
    const img = this.modaleImmagine.nativeElement.querySelector('img')!;
    this.ZoomImagine(2, img);
  }

  SelezionaImmagine(e: Event) {
    if (e.target === e.currentTarget) return;

    const img = e.target as HTMLImageElement;
    const cont = e.currentTarget as HTMLElement;

    cont.querySelectorAll('img').forEach((i) => {
      i.classList.toggle('selezionata', i === img);
    });

    this.img.immagineSelezionata = parseInt(img.src.split('/').at(-1)!);
  }

  ApriModaleImmagine(img: number) {
    this.immagineVisualizzata = this.immaginiCorrenti[img];

    const modale = this.modaleImmagine.nativeElement;
    modale.showModal();
  }

  ChiudiModale() {
    const modale = this.modaleImmagine.nativeElement;
    modale.close();
  }

  ZoomImagine(zoom: number, img: HTMLImageElement) {
    img.addEventListener('load', CaricaImmagine);

    const lente = img.nextElementSibling! as HTMLDivElement;
    const bw = 3;
    const w = lente.offsetWidth / 2;
    const h = lente.offsetHeight / 2;

    let rafId = 0;
    let pendingEvt: MouseEvent | null = null;
    const IniziaMovimento = (e: MouseEvent) => {
      pendingEvt = e;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (pendingEvt) {
            MuoviLente(pendingEvt, w, h, bw);
            pendingEvt = null;
          }
          rafId = 0;
        });
      }
    };

    img.addEventListener('pointermove', IniziaMovimento, { passive: true });

    img.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      img.setPointerCapture(e.pointerId);
      lente.classList.add('visibile');
      MuoviLente(e, w, h, bw);
      img.addEventListener('wheel', Zoom, { passive: true });

      const Rimuovi = () => {
        lente.classList.remove('visibile');
        img.removeEventListener('wheel', Zoom);
        try {
          img.releasePointerCapture(e.pointerId);
        } catch {}
      };

      img.addEventListener('pointerup', Rimuovi, { passive: true, once: true });
      img.addEventListener('pointercancel', Rimuovi, {
        passive: true,
        once: true,
      });
      img.addEventListener('lostpointercapture', Rimuovi, {
        passive: true,
        once: true,
      });
      window.addEventListener('blur', Rimuovi, { passive: true, once: true });

      // Fallback
      document.addEventListener('pointerup', Rimuovi, {
        passive: true,
        once: true,
      });
      img.addEventListener('mouseleave', Rimuovi, {
        passive: true,
        once: true,
      });
    });

    function MuoviLente(e: MouseEvent, w: number, h: number, bw: number) {
      const imgRect = img.getBoundingClientRect();
      const contRect = (
        img.parentElement as HTMLElement
      ).getBoundingClientRect();
      // Posizione del cursore relativa all'immagine
      let { x, y } = PosizioneCursore(e);

      // Clamp dentro i limiti dell'immagine
      x = Math.max(w / zoom, Math.min(x, imgRect.width - w / zoom));
      y = Math.max(h / zoom, Math.min(y, imgRect.height - h / zoom));

      const offsetX = imgRect.left - contRect.left;
      const offsetY = imgRect.top - contRect.top;

      // left/top sul cursore
      lente.style.left = `${offsetX + x}px`;
      lente.style.top = `${offsetY + y}px`;

      lente.style.backgroundPosition = `-${x * zoom - w}px -${y * zoom - h}px`;
    }

    function PosizioneCursore(e: MouseEvent) {
      const rect = img.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y, width: rect.width, height: rect.height };
    }

    function CaricaImmagine() {
      const rect = img.getBoundingClientRect();
      lente.style.backgroundSize = `${rect.width * zoom}px ${
        rect.height * zoom
      }px`;
      lente.style.backgroundImage = `url(${img.src})`;
    }

    function Zoom(e: WheelEvent) {
      if (e.deltaY < 0) {
        zoom = Math.min(zoom + 0.25, 5);
      } else zoom = Math.max(zoom - 0.25, 1.5);

      CaricaImmagine();
      MuoviLente(e, w, h, bw);
    }
  }
}
