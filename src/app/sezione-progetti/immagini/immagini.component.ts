import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { ImmaginiService } from './immagini.service';
import { IconaComponent } from '../../common/icona/icona.component';
import { ModaleImmagineComponent } from './modale-immagine/modale-immagine.component';

@Component({
  selector: 'Immagini',
  imports: [IconaComponent, ModaleImmagineComponent],
  templateUrl: './immagini.component.html',
  styleUrl: './immagini.component.scss',
})
export class ImmaginiComponent implements AfterViewInit, OnChanges {
  @Input('immagini-correnti')
  immaginiCorrenti!: string[];

  @Input('immagini-precedenti')
  immaginiPrecendenti?: string[];

  @Input('resetta-for')
  resettaFor!: boolean;

  protected readonly img: ImmaginiService = inject(ImmaginiService);
  protected isFirstLoad: boolean = true;

  protected immagineVisualizzata: WritableSignal<string | undefined> =
    signal(undefined);

  protected previewCorrenti: string[] = [];
  protected previewPrecedenti: string[] | undefined = undefined;

  ngAfterViewInit(): void {
    this.isFirstLoad = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['immaginiCorrenti'] || changes['immaginiPrecendenti']) {
      this.CaricaAnteprime();
    }
  }

  CaricaAnteprime() {
    this.previewCorrenti = this.immaginiCorrenti.map((img) => {
      const parti = img.split('/');
      const ultima = parti.pop();
      return [...parti, 'preview', ultima].join('/');
    });

    if (this.immaginiPrecendenti) {
      this.previewPrecedenti = this.immaginiPrecendenti.map((img) => {
        const parti = img.split('/');
        const ultima = parti.pop();
        return [...parti, 'preview', ultima].join('/');
      });
    }
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
    this.immagineVisualizzata.set(this.immaginiCorrenti[img]);
  }
}
