import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  DOCUMENT,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Sezioni } from '../sezione-conoscenze/switch/switch.component';
import { SwitchService } from '../sezione-conoscenze/switch/switch.service';
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
    this.ScheduleCalcoloOffset();
  }
  sezione?: string;

  @ViewChild('wrapper')
  wrapper!: ElementRef<HTMLElement>;

  @ViewChild('cella')
  cella!: ElementRef<HTMLElement>;

  @Output()
  onNaviga = new EventEmitter<string>();

  private readonly valore_switch = inject(SwitchService);
  private readonly valore_progetto = inject(ProgettiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly document = inject(DOCUMENT);
  private readonly platform: Object = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platform);

  modalitaVisualizzazione: 'chiaro' | 'scuro' = 'scuro';
  html = this.document.firstElementChild! as HTMLElement;

  headerAperto: boolean = false;
  sezioneMenu?: 'progetti' | 'conoscenze' = undefined;

  ngOnInit() {
    if (!this.isBrowser) return;

    const modalita = localStorage.getItem('modalita-visualizzazione');

    if (modalita === 'chiaro' || modalita === 'scuro') {
      this.modalitaVisualizzazione = modalita;
    } else this.modalitaVisualizzazione = 'scuro';

    this.html.classList.add(this.modalitaVisualizzazione);
  }

  sezioni = Sezioni;
  ultimo: {
    sezione?: string;
    valore?: string;
  } = {};

  timeoutTransizione: any;
  animando: boolean = false;
  offsetX: string = '0px';
  private rafId?: number;

  Scrolla(s: string) {
    const el = document.getElementById(s)!;
    this.onNaviga.emit(s);
    el.scrollIntoView({ behavior: 'smooth' });
  }

  SezioneCorrente(sezione: string | undefined) {
    this.sezione = sezione;
    this.ScheduleCalcoloOffset();
    return this.offsetX;
  }

  private ScheduleCalcoloOffset() {
    if (!this.isBrowser) return;
    if (this.rafId) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = undefined;
      const sezione = this.sezione;
      if (!sezione) {
        this.offsetX = '0px';
        this.cdr.markForCheck();
        return;
      }

      const wrapper = this.wrapper?.nativeElement;
      const header = wrapper?.parentElement as HTMLElement | null;
      const opzione = wrapper?.querySelector(
        `[sezione="${sezione}"]`
      ) as HTMLElement | null;
      const bottone = opzione?.querySelector('button') as HTMLElement | null;
      const cellaGlobale = this.cella?.nativeElement as HTMLElement | undefined;

      if (!wrapper || !header || !bottone) {
        this.offsetX = '0px';
        this.cdr.markForCheck();
        return;
      }

      const { left, width } = bottone.getBoundingClientRect();
      const headerLeft = header.getBoundingClientRect().left;
      const larghezzaCella = cellaGlobale?.offsetWidth ?? 32; // fallback 2rem ≈ 32px
      const targetLeft = left - headerLeft + (width - larghezzaCella) / 2;
      const valore = `${Math.max(0, Math.round(targetLeft))}px`;

      if (this.ultimo.sezione === sezione && this.ultimo.valore === valore)
        return;

      this.offsetX = valore;
      this.ultimo = { sezione, valore };
      this.animando = true;
      clearTimeout(this.timeoutTransizione);
      this.timeoutTransizione = setTimeout(() => {
        this.animando = false;
        this.cdr.markForCheck();
      }, 300);
      this.cdr.markForCheck();
    });
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
    this.valore_switch.bottoni[competenza]?.click();
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
