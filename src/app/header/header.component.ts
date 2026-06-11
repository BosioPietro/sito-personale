import {
  Component,
  computed,
  inject,
  DOCUMENT,
  linkedSignal,
  OnInit,
  PLATFORM_ID,
  input,
  output,
  signal,
} from '@angular/core';
import { Sezioni } from '../sezione-conoscenze/switch/switch.component';
import { ConoscenzeService } from '../sezione-conoscenze/conoscenze.service';
import { ProgettiService } from '../sezione-progetti/selettore-progetti/progetti.service';
import { IconaComponent } from '../common/icona/icona.component';
import { isPlatformBrowser } from '@angular/common';

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
  private readonly valore_progetto = inject(ProgettiService);
  private readonly document = inject(DOCUMENT);
  private readonly platform: Object = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platform);

  protected readonly modalitaVisualizzazione = signal<'chiaro' | 'scuro'>(
    'scuro'
  );
  html = this.document.firstElementChild! as HTMLElement;

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
    if (!this.isBrowser) return;

    const modalita = localStorage.getItem('modalita-visualizzazione');

    if (modalita === 'chiaro' || modalita === 'scuro') {
      this.modalitaVisualizzazione.set(modalita);
    } else this.modalitaVisualizzazione.set('scuro');

    this.html.classList.add(this.modalitaVisualizzazione());
  }

  Scrolla(s: string) {
    const el = document.getElementById(s)!;
    this.naviga.emit(s);
    el.scrollIntoView({ behavior: 'smooth' });
  }

  async CambiaModalitaVisualizzazione(e: Event) {
    this.modalitaVisualizzazione.update((modalita) =>
      modalita === 'scuro' ? 'chiaro' : 'scuro'
    );
    localStorage.setItem(
      'modalita-visualizzazione',
      this.modalitaVisualizzazione()
    );

    const Imposta = () => {
      this.html.classList.toggle(
        'scuro',
        this.modalitaVisualizzazione() === 'scuro'
      );
      this.html.classList.toggle(
        'chiaro',
        this.modalitaVisualizzazione() === 'chiaro'
      );
    };

    if (document.startViewTransition) {
      const bottone = e.currentTarget as HTMLElement;

      await document.startViewTransition(() => Imposta()).ready;
      const { top, left, width, height } = bottone.getBoundingClientRect();

      const destra = window.innerWidth - left;
      const sotto = window.innerHeight - top;
      const raggio = Math.hypot(Math.max(left, destra), Math.max(top, sotto));

      document.documentElement.animate(
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
    } else Imposta();
  }

  SelezionaCompetenza(competenza: Sezioni) {
    this.conoscenzeService.cambiaSezione(competenza);
    this.Scrolla('conoscenze');
    this.headerAperto.set(false);
    this.sezioneMenu.set(undefined);
  }

  SelezionaProgetto(progetto: string) {
    this.valore_progetto.richiediProgetto(progetto);
    this.Scrolla('progetti');
    this.headerAperto.set(false);
    this.sezioneMenu.set(undefined);
  }

  CambiaSezione(s: 'conoscenze' | 'progetti') {
    this.sezioneMenu.update((sezione) => (sezione === s ? undefined : s));
  }
}
