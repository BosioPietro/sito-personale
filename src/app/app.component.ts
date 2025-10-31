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
  private sezioni?: HTMLElement[];
  protected sezioneCorrente: WritableSignal<string | undefined> =
    signal(undefined);

  private eventoScroll?: Subscription;
  private observer?: IntersectionObserver;
  private observerCentro?: IntersectionObserver;
  private centroSezioni = new Map<string, IntersectionObserverEntry>();
  private puoAggiornareCentro = false;
  private mutazione?: MutationObserver;
  private eventoResize?: Subscription;

  @ViewChild('interno')
  private readonly rettangoloInterno!: ElementRef<HTMLElement>;

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
  }

  // Gestione sezione corrente
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

    this.observerCentro = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          this.centroSezioni.set(el.id, entry);
        });

        if (!this.puoAggiornareCentro) {
          this.puoAggiornareCentro = true;
          requestAnimationFrame(() => {
            this.puoAggiornareCentro = false;
            this.AggiornaSezioneCentrale();
          });
        }
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: '-40% 0px -40% 0px',
      }
    );

    this.sezioni.forEach((s) => this.observerCentro!.observe(s));

    this.eventoScroll = fromEvent(window, 'scroll')
      .pipe(auditTime(120))
      .subscribe(() => {
        if (!this.puoAggiornareCentro) {
          this.puoAggiornareCentro = true;
          requestAnimationFrame(() => {
            this.puoAggiornareCentro = false;
            this.AggiornaSezioneCentrale();
          });
        }
      });

    // Aggiorna sezioni osservate quando cambia il DOM (es. @defer, lazy components)
    if (radice) {
      this.mutazione = new MutationObserver(() => {
        this.AggiornaSezioni(radice!);
      });
      this.mutazione.observe(radice, { childList: true });
    }

    // Aggiorna su resize (layout cambia dimensioni, ma non forza misure qui)
    this.eventoResize = fromEvent(window, 'resize')
      .pipe(auditTime(200))
      .subscribe(() => {
        if (radice) this.AggiornaSezioni(radice);
        this.AggiornaSezioneCentrale();
      });

    // Prima selezione
    this.AggiornaSezioneCentrale();
  }

  ngOnDestroy(): void {
    this.eventoScroll?.unsubscribe();
    this.eventoResize?.unsubscribe();
    if (this.isBrowser) {
      this.observer?.disconnect();
      this.observerCentro?.disconnect();
      this.mutazione?.disconnect();
    }
  }

  private AggiornaSezioneCentrale() {
    if (!this.sezioni || !this.sezioni.length) return;

    const migliore = {
      id: '',
      score: -1,
    };

    this.centroSezioni.forEach((entry, id) => {
      if (entry.isIntersecting) {
        const score = entry.intersectionRect?.height ?? 0;
        if (score > migliore.score) {
          migliore.score = score;
          migliore.id = id;
        }
      }
    });

    const contattiEntry = this.centroSezioni.get('contatti');
    if (contattiEntry && contattiEntry.rootBounds) {
      const rb = contattiEntry.rootBounds;
      const br = contattiEntry.boundingClientRect;
      const bottomInside = br.top <= rb.bottom && br.bottom >= rb.bottom;
      const visRatio = contattiEntry.intersectionRatio;
      const nearBottom =
        window.scrollY + window.innerHeight >=
        (document.documentElement.scrollHeight || document.body.scrollHeight) -
          2;

      if ((bottomInside && visRatio >= 0.33) || nearBottom) {
        migliore.id = 'contatti';
      }
    }

    if (migliore.id && migliore.id !== this.sezioneCorrente()) {
      this.sezioneCorrente.set(migliore.id);
    }
  }

  private AggiornaSezioni(radice: Element) {
    const nuove = Array.from(
      radice.querySelectorAll(':scope > [id]')
    ) as HTMLElement[];
    const vecchie = new Set(this.sezioni);
    const nuoveSet = new Set(nuove);

    // Osserva nuovi elementi
    nuove.forEach((el) => {
      if (!vecchie.has(el)) {
        this.observer?.observe(el);
        this.observerCentro?.observe(el);
      }
    });

    // Smetti di osservare elementi rimossi
    (this.sezioni ?? []).forEach((el) => {
      if (!nuoveSet.has(el)) {
        this.observer?.unobserve(el);
        this.observerCentro?.unobserve(el);
      }
    });

    this.sezioni = nuove;
    this.AggiornaSezioneCentrale();
  }
}
