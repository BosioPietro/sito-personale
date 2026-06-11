import {
  Component,
  DestroyRef,
  ElementRef,
  AfterViewInit,
  inject,
  effect,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { progetti, Progetto } from './dati';
import { TecnologieComponent } from './tecnologie/tecnologie.component';
import { DescrizioneComponent } from './descrizione/descrizione.component';
import { SelettoreProgettiComponent } from './selettore-progetti/selettore-progetti.component';
import { ImmaginiComponent } from './immagini/immagini.component';
import { ImmaginiService } from './immagini/immagini.service';
import { IconaComponent } from '../common/icona/icona.component';
import { ProgettiService } from './selettore-progetti/progetti.service';

@Component({
  selector: 'SezioneProgetti',
  imports: [
    TecnologieComponent,
    DescrizioneComponent,
    SelettoreProgettiComponent,
    ImmaginiComponent,
    IconaComponent,
  ],
  templateUrl: './sezione-progetti.component.html',
  styleUrl: './sezione-progetti.component.scss',
  host: {
    '[class.puo-animare]': 'puoAnimare()',
  },
})
export class SezioneProgettiComponent implements AfterViewInit {
  private readonly descrizione =
    viewChild.required<ElementRef<HTMLElement>>('descrizione');

  readonly progetti = progetti;
  protected readonly progettoSelezionato = signal(this.progetti[0]);
  protected readonly progettoPrecedente = signal<Progetto | undefined>(
    undefined
  );

  protected readonly espandiMenu = signal(false);
  protected readonly puoCambiare = signal(true);

  private readonly img = inject(ImmaginiService);
  private readonly progettiService = inject(ProgettiService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly vistaPronta = signal(false);
  protected readonly puoAnimare = signal(false);

  private readonly richiestaProgettoEffect = effect(() => {
    const richiesta = this.progettiService.progettoRichiesto();
    if (!richiesta || !this.vistaPronta()) return;

    const progetto = this.progetti.find((p) => p.nome === richiesta.nome);
    if (progetto) {
      untracked(() => this.SelezionaProgetto(progetto));
    }
  });

  ApriLink(link: string) {
    window.open(link, '_blank');
  }

  SelezionaProgetto(p: Progetto) {
    if (this.progettoSelezionato() === p || !this.puoCambiare()) return;

    this.progettoPrecedente.set(this.progettoSelezionato());
    this.progettoSelezionato.set(p);
    this.puoCambiare.set(false);

    this.img.conservaImmagineCorrenteComePrecedente();
    this.img.selezionaImmagine(0);

    const desc = this.descrizione().nativeElement.querySelector('descrizione')!;
    desc.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setTimeout(() => {
      this.progettoPrecedente.set(undefined);
      this.img.resettaImmaginePrecedente();
      this.puoCambiare.set(true);
    }, 500);
  }

  ngAfterViewInit(): void {
    this.vistaPronta.set(true);

    if (!this.isBrowser) return;
    const el = this.hostRef.nativeElement;
    const obs = new IntersectionObserver(
      ([e, ..._], observer) => {
        if (e.isIntersecting) {
          this.puoAnimare.set(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.0 }
    );
    obs.observe(el);
    this.destroyRef.onDestroy(() => obs.disconnect());
  }
}
