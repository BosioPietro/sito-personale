import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SezionePrincipaleComponent } from './sezione-principale/sezione-principale.component';
import { SezioneConoscenzeComponent } from './sezione-conoscenze/sezione-conoscenze.component';
import { SezioneProgettiComponent } from './sezione-progetti/sezione-progetti.component';
import { FooterContattiComponent } from './footer-contatti/footer-contatti.component';
import { isPlatformBrowser } from '@angular/common';
import { SezionePaginaDirective } from './sezione-pagina.directive';
import { SezioniPaginaService } from './sezioni-pagina.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    SezionePrincipaleComponent,
    SezioneConoscenzeComponent,
    SezioneProgettiComponent,
    FooterContattiComponent,
    SezionePaginaDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  private readonly rettangoloInterno =
    viewChild.required<ElementRef<SVGRectElement>>('interno');

  private readonly platform: Object = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platform);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly sezioniPagina = inject(SezioniPaginaService);

  protected readonly sezioneCorrente = this.sezioniPagina.sezioneCorrente;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // forse è un bug con i <rect> svg, quando
    // faccio il resize della pagina la width
    // che collegata a --bordo non si aggiorna
    // quindi l'aggiorno manualmente
    const r = this.rettangoloInterno().nativeElement;
    let resetWidthId: number | undefined;
    const correggiLarghezzaCornice = () => {
      r.setAttribute(
        'style',
        'width: calc(100% - var(--bordo) * 1.5) !important'
      );

      if (resetWidthId !== undefined) window.clearTimeout(resetWidthId);
      resetWidthId = window.setTimeout(() => (r.style.width = ''));
    };

    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => correggiLarghezzaCornice());

    this.destroyRef.onDestroy(() => {
      if (resetWidthId !== undefined) window.clearTimeout(resetWidthId);
    });
  }
}
