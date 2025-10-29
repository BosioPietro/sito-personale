import {
  AfterViewInit,
  Component,
  DOCUMENT,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SezionePrincipaleComponent } from './sezione-principale/sezione-principale.component';
import { SezioneConoscenzeComponent } from './sezione-conoscenze/sezione-conoscenze.component';
import { SezioneProgettiComponent } from './sezione-progetti/sezione-progetti.component';
import { FooterContattiComponent } from './footer-contatti/footer-contatti.component';
import { Subscription, fromEvent, auditTime } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    SezionePrincipaleComponent,
    SezioneConoscenzeComponent,
    SezioneProgettiComponent,
    FooterContattiComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  title = 'Progetto';

  sezioni?: HTMLElement[];
  sezioneCorrente: WritableSignal<string | undefined> = signal(undefined);

  eventoScroll?: Subscription;
  observer?: IntersectionObserver;

  @ViewChild('interno')
  rettangoloInterno!: ElementRef<HTMLElement>;

  private readonly platform: Object = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platform);

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // forse è un bug con i <rect> svg, quando
    // faccio il resize della pagina la width
    // che collegata a --bordo non si aggiorna
    // quindi l'aggiorno manualmente
    const r = this.rettangoloInterno.nativeElement;
    window.addEventListener('resize', () => {
      r.setAttribute(
        'style',
        'width: calc(100% - var(--bordo) * 1.5) !important'
      );

      setTimeout(() => (r.style.width = ''));
    });

    // Aggiorna la sezione corrente in modo stabile usando il centro del viewport
    this.eventoScroll = fromEvent(window, 'scroll')
      .pipe(auditTime(120))
      .subscribe(() => this.SezionePagina());

    // Prima rilevazione iniziale
    this.SezionePagina();
  }

  // gestione sezione corrente
  ngOnInit(): void {
    if (!this.isBrowser) return;

    const radice = document.querySelector('app-root');
    const sezioni = radice?.querySelectorAll(':scope > [id]') ?? [];
    this.sezioni = Array.from(sezioni) as HTMLElement[];

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          el.classList.toggle('visibile', entry.intersectionRatio >= 0.33);
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    this.sezioni.forEach((s) => this.observer!.observe(s));
  }

  ngOnDestroy(): void {
    this.eventoScroll?.unsubscribe();
    if (this.isBrowser) {
      this.observer?.disconnect();
    }
  }

  SezionePagina() {
    // Sezioni dirette figli di app-root
    if (!this.sezioni || !this.sezioni.length) {
      const radice = document.querySelector('app-root');
      const sezioni = radice?.querySelectorAll(':scope > [id]') ?? [];
      this.sezioni = Array.from(sezioni) as HTMLElement[];
    }

    if (!this.sezioni || !this.sezioni.length) return;

    const centerY = window.innerHeight / 2;

    // 1) Preferisci la sezione che contiene il centro del viewport
    const contenentiCentro = this.sezioni.filter((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= centerY && r.bottom >= centerY;
    });

    let corrente: string | undefined;
    if (contenentiCentro.length) {
      // Se più sezioni contengono il centro, scegli quella più centrata
      contenentiCentro.sort((a, b) => {
        const ca = Math.abs(
          (a.getBoundingClientRect().top + a.getBoundingClientRect().bottom) /
            2 -
            centerY
        );
        const cb = Math.abs(
          (b.getBoundingClientRect().top + b.getBoundingClientRect().bottom) /
            2 -
            centerY
        );
        return ca - cb;
      });
      corrente = contenentiCentro[0].id;
    } else {
      // 2) Altrimenti scegli la sezione col centro più vicino al centro viewport
      const ordinate = this.sezioni
        .map((s) => {
          const r = s.getBoundingClientRect();
          const centroSez = (r.top + r.bottom) / 2;
          return { id: s.id, dist: Math.abs(centroSez - centerY) };
        })
        .sort((a, b) => a.dist - b.dist);
      corrente = ordinate[0]?.id;
    }

    // Regola speciale per il footer "contatti":
    // se il fondo del viewport entra nel footer e almeno una porzione
    // significativa è visibile, attiva "contatti" anche se il centro viewport
    // resta sopra.
    const contattiEl = this.sezioni.find((s) => s.id === 'contatti');
    if (contattiEl) {
      const r = contattiEl.getBoundingClientRect();
      const viewportTop = 0;
      const viewportBottom = window.innerHeight;

      const intersection = Math.max(
        0,
        Math.min(r.bottom, viewportBottom) - Math.max(r.top, viewportTop)
      );
      const visRatio = intersection / Math.max(r.height, 1);
      const bottomInside =
        r.top <= viewportBottom && r.bottom >= viewportBottom;
      const nearBottom =
        window.scrollY + window.innerHeight >=
        (document.documentElement.scrollHeight || document.body.scrollHeight) -
          2;

      // Attiva contatti se il fondo è dentro al footer con >=25% visibile
      // oppure se siamo praticamente a fine pagina.
      if ((bottomInside && visRatio >= 0.33) || nearBottom) {
        corrente = 'contatti';
      }
    }

    if (corrente && corrente !== this.sezioneCorrente()) {
      this.sezioneCorrente.set(corrente);
    }
  }
}
