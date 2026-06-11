import {
  AfterViewInit,
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { ImmaginiService } from './immagini.service';
import { IconaComponent } from '../../common/icona/icona.component';
import { ModaleImmagineComponent } from './modale-immagine/modale-immagine.component';

@Component({
  selector: 'Immagini',
  imports: [IconaComponent, ModaleImmagineComponent],
  templateUrl: './immagini.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './immagini.component.scss',
})
export class ImmaginiComponent implements AfterViewInit {
  readonly immaginiCorrenti = input.required<string[]>({
    alias: 'immagini-correnti',
  });

  readonly immaginiPrecendenti = input<string[] | undefined>(undefined, {
    alias: 'immagini-precedenti',
  });

  readonly resettaFor = input.required<boolean>({ alias: 'resetta-for' });

  protected readonly img: ImmaginiService = inject(ImmaginiService);
  protected isFirstLoad: boolean = true;

  protected immagineVisualizzata: WritableSignal<string | undefined> =
    signal(undefined);

  protected readonly previewCorrenti = computed(() =>
    this.CaricaAnteprime(this.immaginiCorrenti())
  );

  protected readonly previewPrecedenti = computed(() => {
    const immagini = this.immaginiPrecendenti();
    return immagini ? this.CaricaAnteprime(immagini) : undefined;
  });

  ngAfterViewInit(): void {
    this.isFirstLoad = false;
  }

  CaricaAnteprime(immagini: string[]) {
    return immagini.map((img) => {
      const parti = img.split('/');
      const ultima = parti.pop();
      return [...parti, 'preview', ultima].join('/');
    });
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
    this.immagineVisualizzata.set(this.immaginiCorrenti()[img]);
  }
}
