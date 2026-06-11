import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
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
  // per portare l'enum nel componente
  protected readonly sezioni = Sezioni;

  private readonly conoscenzeService = inject(ConoscenzeService);
  protected readonly sezioneCorrente = this.conoscenzeService.sezione;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly window = inject(DOCUMENT).defaultView;
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly puoAnimare = signal(false);

  CambiaSezione(s: Sezioni) {
    this.conoscenzeService.cambiaSezione(s);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser || !this.window) return;

    const el = this.hostRef.nativeElement;
    const obs = new this.window.IntersectionObserver(
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
    this.destroyRef.onDestroy(() => obs.disconnect());
  }
}
