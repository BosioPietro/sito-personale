import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  HostBinding,
  inject,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SezioneConoscenzeComponent implements AfterViewInit, OnDestroy {
  EffettoMouse = EffettoMouse;
  // per portare l'enum nel componente
  Sezioni = Sezioni;

  sezioneCorrente: Sezioni = Sezioni.Web;

  @HostBinding('class.puo-animare')
  puoAnimare = false;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly conoscenzeService = inject(ConoscenzeService);
  private subscription?: Subscription;

  CambiaSezione(s: Sezioni) {
    this.sezioneCorrente = s;
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    
    // Sottoscrizione ai cambi di sezione dal servizio
    this.subscription = this.conoscenzeService.sezione$.subscribe(sezione => {
      this.CambiaSezione(sezione);
      this.cdr.markForCheck();
    });
    
    const el = this.hostRef.nativeElement;
    const obs = new IntersectionObserver(
      (entries, observer) => {
        const e = entries[0];
        if (e.isIntersecting) {
          this.puoAnimare = true;
          observer.disconnect();
          this.cdr.markForCheck();
        }
      },
      { root: null, threshold: 0.1 }
    );
    obs.observe(el);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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
