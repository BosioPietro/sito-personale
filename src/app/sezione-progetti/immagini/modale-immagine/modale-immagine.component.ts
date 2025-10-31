import {
  AfterViewInit,
  Component,
  ElementRef,
  model,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IconaComponent } from '../../../common/icona/icona.component';

@Component({
  selector: 'ModaleImmagine',
  templateUrl: './modale-immagine.component.html',
  styleUrls: ['./modale-immagine.component.scss'],
  imports: [IconaComponent],
})
export class ModaleImmagineComponent implements AfterViewInit, OnChanges {
  public src = model<string | undefined>();

  @ViewChild('dialog')
  dialogRef!: ElementRef<HTMLDialogElement>;

  @ViewChild('img')
  imgRef!: ElementRef<HTMLImageElement>;

  Apri(): void {
    this.dialogRef?.nativeElement.showModal();
  }

  Chiudi(): void {
    this.dialogRef?.nativeElement.close();
    setTimeout(() => {
      this.src.set(undefined);
    }, 200);
  }

  ngOnChanges(c: SimpleChanges): void {
    if ('src' in c && c['src'].currentValue) {
      this.Apri();
    }
  }

  ngAfterViewInit(): void {
    // Inizializza zoom e lente sull'immagine del modale
    const img = this.imgRef?.nativeElement;
    if (img) {
      this.ZoomImagine(2, img);
    }
  }

  // --- Logica Zoom/Lente spostata qui dal componente Immagini ---
  private ZoomImagine(zoomLevel: number, img: HTMLImageElement): void {
    const contImg = img.parentElement as HTMLDivElement;
    const lente = contImg.querySelector('.lente') as HTMLDivElement;

    const CaricaImmagine = () => {
      lente.style.backgroundImage = `url('${img.src}')`;
      lente.style.backgroundRepeat = 'no-repeat';
      lente.style.backgroundSize = `${img.width * zoomLevel}px ${
        img.height * zoomLevel
      }px`;
    };

    const PosizioneCursore = (e: PointerEvent) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return { x, y };
    };

    const Zoom = (pos: { x: number; y: number }) => {
      const x = pos.x * zoomLevel - lente.offsetWidth / 2;
      const y = pos.y * zoomLevel - lente.offsetHeight / 2;
      lente.style.backgroundPosition = `-${x}px -${y}px`;
    };

    const MuoviLente = (e: PointerEvent) => {
      const pos = PosizioneCursore(e);
      lente.style.left = `${pos.x - lente.offsetWidth / 2}px`;
      lente.style.top = `${pos.y - lente.offsetHeight / 2}px`;
      Zoom(pos);
    };

    const IniziaMovimento = (e: PointerEvent) => {
      lente.style.display = 'block';
      MuoviLente(e);
    };

    const FermaMovimento = () => {
      lente.style.display = 'none';
    };

    img.addEventListener('load', CaricaImmagine);
    img.addEventListener('pointerenter', IniziaMovimento, { passive: true });
    img.addEventListener('pointermove', MuoviLente, { passive: true });
    img.addEventListener('pointerleave', FermaMovimento, { passive: true });
  }
}
