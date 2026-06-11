import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { SezioniPaginaService } from './sezioni-pagina.service';

@Directive({
  selector: '[appSezionePagina]',
  host: {
    '[class.visibile]': 'visibile()',
  },
})
export class SezionePaginaDirective implements AfterViewInit {
  readonly appSezionePagina = input.required<string>();

  protected readonly visibile = signal(false);

  private readonly elemento = inject(ElementRef<HTMLElement>);
  private readonly sezioniPagina = inject(SezioniPaginaService);
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    const id = this.appSezionePagina();
    const host = this.elemento.nativeElement;

    this.sezioniPagina.registraSezione(id, host, (visibile) => {
      this.visibile.set(visibile);
    });

    this.destroyRef.onDestroy(() => {
      this.sezioniPagina.rimuoviSezione(id, host);
    });
  }
}
