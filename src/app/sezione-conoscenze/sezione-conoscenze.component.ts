import {
  Component,
  AfterViewInit,
  inject,
  signal,
} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ElementRef } from '@angular/core';
import { GrigliaCertificazioniComponent } from './griglia-certificazioni/griglia-certificazioni.component';
import { GrigliaWebComponent } from './griglia-web/griglia-web.component';
import { SfondoComponent } from './sfondo/sfondo.component';
import { Sezioni, SwitchComponent } from './switch/switch.component';
import { GrigliaSviluppoComponent } from './griglia-sviluppo/griglia-sviluppo.component';
import { ConoscenzeService } from './conoscenze.service';

@Component({
  selector: 'SezioneConoscenze',
  imports: [
    SwitchComponent,
    SfondoComponent,
    GrigliaWebComponent,
    GrigliaCertificazioniComponent,
    GrigliaSviluppoComponent,
  ],
  templateUrl: './sezione-conoscenze.component.html',
  styleUrl: './sezione-conoscenze.component.scss',
  host: {
    '[class.puo-animare]': 'puoAnimare()',
  },
})
export class SezioneConoscenzeComponent implements AfterViewInit {
  EffettoMouse = EffettoMouse;
  // per portare l'enum nel componente
  Sezioni = Sezioni;

  private readonly conoscenzeService = inject(ConoscenzeService);
  protected readonly sezioneCorrente = this.conoscenzeService.sezione;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  protected readonly puoAnimare = signal(false);

  CambiaSezione(s: Sezioni) {
    this.conoscenzeService.cambiaSezione(s);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const el = this.hostRef.nativeElement;
    const obs = new IntersectionObserver(
      (entries, observer) => {
        const e = entries[0];
        if (e.isIntersecting) {
          this.puoAnimare.set(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.1 }
    );
    obs.observe(el);
  }
}

// funzione per l'effetto delle singole carte
export const EffettoMouse = (e: MouseEvent) => {
  const cont = e.currentTarget as HTMLElement;
  const celle = Array.from<HTMLElement>(cont.querySelectorAll('.card'));

  const { clientX, clientY } = e;

  for (const cella of celle) {
    const { left, top } = cella.getBoundingClientRect();

    cella.style.setProperty('--mouse-x', `${clientX - left}px`);
    cella.style.setProperty('--mouse-y', `${clientY - top}px`);
  }
};
