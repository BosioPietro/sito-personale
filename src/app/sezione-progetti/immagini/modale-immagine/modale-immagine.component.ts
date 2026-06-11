import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  model,
  OnChanges,
  SimpleChanges,
  signal,
  viewChild,
} from '@angular/core';
import { IconaComponent } from '../../../common/icona/icona.component';

@Component({
  selector: 'ModaleImmagine',
  templateUrl: './modale-immagine.component.html',
  styleUrls: ['./modale-immagine.component.scss'],
  imports: [IconaComponent],
})
export class ModaleImmagineComponent implements OnChanges {
  public src = model<string | undefined>();

  private readonly window = inject(DOCUMENT).defaultView;
  private readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly lenteVisibile = signal(false);
  protected readonly lenteBackgroundImage = signal('');
  protected readonly lenteBackgroundSize = signal('');
  protected readonly lenteBackgroundPosition = signal('');
  protected readonly lenteX = signal(0);
  protected readonly lenteY = signal(0);

  private readonly zoomLevel = 2;
  private chiusuraId: number | undefined;

  Apri(): void {
    this.dialogRef()?.nativeElement.showModal();
  }

  Chiudi(): void {
    this.dialogRef()?.nativeElement.close();
    if (!this.window) {
      this.src.set(undefined);
      return;
    }

    if (this.chiusuraId !== undefined) this.window.clearTimeout(this.chiusuraId);
    this.chiusuraId = this.window.setTimeout(() => {
      this.src.set(undefined);
    }, 200);
  }

  ngOnChanges(c: SimpleChanges): void {
    if ('src' in c && c['src'].currentValue) {
      this.Apri();
    }
  }

  caricaImmagine(img: HTMLImageElement): void {
    this.lenteBackgroundImage.set(`url('${img.src}')`);
    this.lenteBackgroundSize.set(
      `${img.width * this.zoomLevel}px ${img.height * this.zoomLevel}px`
    );
  }

  iniziaMovimento(e: PointerEvent, img: HTMLImageElement): void {
    this.lenteVisibile.set(true);
    this.muoviLente(e, img);
  }

  muoviLente(e: PointerEvent, img: HTMLImageElement): void {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const lenteSize = 320;
    const backgroundX = x * this.zoomLevel - lenteSize / 2;
    const backgroundY = y * this.zoomLevel - lenteSize / 2;

    this.lenteX.set(x);
    this.lenteY.set(y);
    this.lenteBackgroundPosition.set(`-${backgroundX}px -${backgroundY}px`);
  }

  fermaMovimento(): void {
    this.lenteVisibile.set(false);
  }
}
