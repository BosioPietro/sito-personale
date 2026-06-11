import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  OnInit,
  PLATFORM_ID,
  input,
  output,
  signal,
  Renderer2,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Sezioni } from '../sezione-conoscenze/switch/switch.component';
import { ConoscenzeService } from '../sezione-conoscenze/conoscenze.service';
import { ProgettiService } from '../sezione-progetti/selettore-progetti/progetti.service';
import { IconaComponent } from '../common/icona/icona.component';

declare global {
  interface ViewTransitionUpdateCallback {
    (): void;
  }

  interface StartViewTransitionOptions {
    updateCallback?: ViewTransitionUpdateCallback | undefined;
  }

  interface ViewTransition {
    readonly ready: Promise<void>;
  }

  interface Document {
    startViewTransition: (
      callbackOptions?:
        | ViewTransitionUpdateCallback
        | StartViewTransitionOptions
        | undefined
    ) => ViewTransition;
  }
}

@Component({
  selector: 'Header',
  imports: [IconaComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    '[style.--indicatore-ancora]': 'indicatoreAncora()',
  },
})
export class HeaderComponent implements OnInit {
  readonly sezioneCorrente = input<string | undefined>(undefined, {
    alias: 'sezione-corrente',
  });

  readonly naviga = output<string>();

  private readonly conoscenzeService = inject(ConoscenzeService);
  private readonly valoreProgetto = inject(ProgettiService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly renderer = inject(Renderer2);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly window = this.document.defaultView;
  private readonly html = this.document.documentElement;

  protected readonly modalitaVisualizzazione = signal<'chiaro' | 'scuro'>(
    'scuro'
  );
  private readonly temaEffect = effect(() => {
    if (!this.isBrowser) return;

    this.applicaTema(this.modalitaVisualizzazione());
  });

  protected readonly headerAperto = linkedSignal<string | undefined, boolean>({
    source: this.sezioneCorrente,
    computation: (sezione, precedente) =>
      precedente && sezione === precedente.source ? precedente.value : false,
  });

  protected readonly sezioneMenu = linkedSignal<
    string | undefined,
    'progetti' | 'conoscenze' | undefined
  >({
    source: this.sezioneCorrente,
    computation: (sezione, precedente) =>
      precedente && sezione === precedente.source ? precedente.value : undefined,
  });

  protected readonly indicatoreAncora = computed(() =>
    this.mappaSezioneAAncora(this.sezioneCorrente())
  );

  private mappaSezioneAAncora(s?: string): string {
    switch (s) {
      case 'principale':
        return '--ancora-principale';
      case 'conoscenze':
        return '--ancora-conoscenze';
      case 'progetti':
        return '--ancora-progetti';
      case 'contatti':
        return '--ancora-contatti';
      default:
        return '--ancora-principale';
    }
  }

  protected readonly sezioni = Sezioni;

  ngOnInit() {
    if (!this.isBrowser || !this.window) return;

    const modalita = this.window.localStorage.getItem(
      'modalita-visualizzazione'
    );

    if (modalita === 'chiaro' || modalita === 'scuro') {
      this.modalitaVisualizzazione.set(modalita);
    } else this.modalitaVisualizzazione.set('scuro');

    this.applicaTema(this.modalitaVisualizzazione());
  }

  Scrolla(s: string) {
    const el = this.document.getElementById(s);
    if (!el) return;

    this.naviga.emit(s);
    el.scrollIntoView({ behavior: 'smooth' });
  }

  async CambiaModalitaVisualizzazione(e: Event) {
    if (!this.isBrowser || !this.window) return;

    const prossimaModalita =
      this.modalitaVisualizzazione() === 'scuro' ? 'chiaro' : 'scuro';
    const imposta = () => {
      this.modalitaVisualizzazione.set(prossimaModalita);
      this.applicaTema(prossimaModalita);
    };

    if (this.document.startViewTransition) {
      const bottone = e.currentTarget as HTMLElement;

      await this.document.startViewTransition(() => imposta()).ready;
      const { top, left, width, height } = bottone.getBoundingClientRect();

      const destra = this.window.innerWidth - left;
      const sotto = this.window.innerHeight - top;
      const raggio = Math.hypot(Math.max(left, destra), Math.max(top, sotto));

      this.document.documentElement.animate(
        {
          clipPath: [
            `circle(0 at ${left + width / 2}px ${top + height / 2}px)`,
            `circle(${raggio}px at ${left + width / 2}px ${
              top + height / 2
            }px)`,
          ],
        },
        {
          duration: 750,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    } else imposta();

    this.window.localStorage.setItem(
      'modalita-visualizzazione',
      prossimaModalita
    );
  }

  SelezionaCompetenza(competenza: Sezioni) {
    this.conoscenzeService.cambiaSezione(competenza);
    this.Scrolla('conoscenze');
    this.headerAperto.set(false);
    this.sezioneMenu.set(undefined);
  }

  SelezionaProgetto(progetto: string) {
    this.valoreProgetto.richiediProgetto(progetto);
    this.Scrolla('progetti');
    this.headerAperto.set(false);
    this.sezioneMenu.set(undefined);
  }

  CambiaSezione(s: 'conoscenze' | 'progetti') {
    this.sezioneMenu.update((sezione) => (sezione === s ? undefined : s));
  }

  private applicaTema(modalita: 'chiaro' | 'scuro'): void {
    if (modalita === 'scuro') {
      this.renderer.addClass(this.html, 'scuro');
      this.renderer.removeClass(this.html, 'chiaro');
      return;
    }

    this.renderer.addClass(this.html, 'chiaro');
    this.renderer.removeClass(this.html, 'scuro');
  }
}
