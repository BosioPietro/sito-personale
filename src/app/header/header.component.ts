import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  inject,
  DOCUMENT,
  OnInit,
  PLATFORM_ID,
  HostBinding,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input('sezione-corrente')
  set sezioneCorrente(s: string | undefined) {
    this.sezione = s;
    this.indicatoreAncora = this.mappaSezioneAAncora(s);
  }
  sezione?: string;

  @Output()
  onNaviga = new EventEmitter<string>();

  private readonly conoscenzeService = inject(ConoscenzeService);
  private readonly valore_progetto = inject(ProgettiService);
  private readonly document = inject(DOCUMENT);
  private readonly platform: Object = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platform);

  modalitaVisualizzazione: 'chiaro' | 'scuro' = 'scuro';
  html = this.document.firstElementChild! as HTMLElement;

  headerAperto: boolean = false;
  sezioneMenu?: 'progetti' | 'conoscenze' = undefined;

  @HostBinding('style.--indicatore-ancora')
  indicatoreAncora: string = '--ancora-principale';

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
      this.modalitaVisualizzazione = modalita;
    } else this.modalitaVisualizzazione = 'scuro';

    this.html.classList.add(this.modalitaVisualizzazione);
  }

  Scrolla(s: string) {
    const el = document.getElementById(s)!;
    this.onNaviga.emit(s);
    el.scrollIntoView({ behavior: 'smooth' });
  }

  async CambiaModalitaVisualizzazione(e: Event) {
    this.modalitaVisualizzazione =
      this.modalitaVisualizzazione === 'scuro' ? 'chiaro' : 'scuro';
    localStorage.setItem(
      'modalita-visualizzazione',
      this.modalitaVisualizzazione
    );

    const Imposta = () => {
      this.html.classList.toggle(
        'scuro',
        this.modalitaVisualizzazione === 'scuro'
      );
      this.html.classList.toggle(
        'chiaro',
        this.modalitaVisualizzazione === 'chiaro'
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
    this.headerAperto = false;
    this.sezioneMenu = undefined;
  }

  SelezionaProgetto(progetto: string) {
    this.valore_progetto.bottoni[progetto]?.click();
    this.Scrolla('progetti');
    this.headerAperto = false;
    this.sezioneMenu = undefined;
  }

  CambiaSezione(s: 'conoscenze' | 'progetti') {
    if (this.sezioneMenu === s) {
      this.sezioneMenu = undefined;
    } else this.sezioneMenu = s;
  }
}
