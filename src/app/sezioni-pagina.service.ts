import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DestroyRef, PLATFORM_ID, Service, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { auditTime, fromEvent } from 'rxjs';

type AggiornaVisibilita = (visibile: boolean) => void;

@Service()
export class SezioniPaginaService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly sezioneCorrenteInterna = signal<string | undefined>(undefined);
  private readonly sezioni = new Map<string, HTMLElement>();
  private readonly centroSezioni = new Map<string, IntersectionObserverEntry>();
  private visibilitaObserver?: IntersectionObserver;
  private centroObserver?: IntersectionObserver;
  private aggiornamentoPianificato = false;

  readonly sezioneCorrente = this.sezioneCorrenteInterna.asReadonly();

  constructor() {
    if (!this.isBrowser) return;

    this.visibilitaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement & {
            aggiornaVisibilita?: AggiornaVisibilita;
          };

          el.aggiornaVisibilita?.(entry.intersectionRatio >= 0.33);
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    this.centroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          this.centroSezioni.set(el.id, entry);
        });

        this.pianificaAggiornamentoSezione();
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: '-40% 0px -40% 0px',
      }
    );

    fromEvent(window, 'scroll')
      .pipe(auditTime(120), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.pianificaAggiornamentoSezione());

    fromEvent(window, 'resize')
      .pipe(auditTime(200), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.aggiornaSezioneCentrale());
  }

  registraSezione(
    id: string,
    elemento: HTMLElement,
    aggiornaVisibilita: AggiornaVisibilita
  ): void {
    if (!this.isBrowser || !id) return;

    (elemento as HTMLElement & { aggiornaVisibilita?: AggiornaVisibilita })
      .aggiornaVisibilita = aggiornaVisibilita;

    this.sezioni.set(id, elemento);
    this.visibilitaObserver?.observe(elemento);
    this.centroObserver?.observe(elemento);
    this.pianificaAggiornamentoSezione();
  }

  rimuoviSezione(id: string, elemento: HTMLElement): void {
    if (!this.isBrowser || !id) return;

    this.visibilitaObserver?.unobserve(elemento);
    this.centroObserver?.unobserve(elemento);
    this.sezioni.delete(id);
    this.centroSezioni.delete(id);
    delete (elemento as HTMLElement & { aggiornaVisibilita?: AggiornaVisibilita })
      .aggiornaVisibilita;
    this.pianificaAggiornamentoSezione();
  }

  impostaSezioneCorrente(id: string): void {
    this.sezioneCorrenteInterna.set(id);
  }

  private pianificaAggiornamentoSezione(): void {
    if (this.aggiornamentoPianificato) return;

    this.aggiornamentoPianificato = true;
    requestAnimationFrame(() => {
      this.aggiornamentoPianificato = false;
      this.aggiornaSezioneCentrale();
    });
  }

  private aggiornaSezioneCentrale(): void {
    if (!this.sezioni.size) return;

    const migliore = {
      id: '',
      score: -1,
    };

    this.centroSezioni.forEach((entry, id) => {
      if (!entry.isIntersecting) return;

      const score = entry.intersectionRect?.height ?? 0;
      if (score > migliore.score) {
        migliore.score = score;
        migliore.id = id;
      }
    });

    const contattiEntry = this.centroSezioni.get('contatti');
    if (contattiEntry?.rootBounds) {
      const rootBounds = contattiEntry.rootBounds;
      const rect = contattiEntry.boundingClientRect;
      const fondoDentroViewport =
        rect.top <= rootBounds.bottom && rect.bottom >= rootBounds.bottom;
      const finePagina =
        window.scrollY + window.innerHeight >=
        (this.document.documentElement.scrollHeight ||
          this.document.body.scrollHeight) -
          2;

      if (
        (fondoDentroViewport && contattiEntry.intersectionRatio >= 0.33) ||
        finePagina
      ) {
        migliore.id = 'contatti';
      }
    }

    if (migliore.id && migliore.id !== this.sezioneCorrenteInterna()) {
      this.sezioneCorrenteInterna.set(migliore.id);
    }
  }
}
