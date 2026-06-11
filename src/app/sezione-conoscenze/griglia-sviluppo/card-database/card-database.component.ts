import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';

@Component({
  selector: 'CardDatabase',
  imports: [],
  templateUrl: './card-database.component.html',
  styleUrl: './card-database.component.scss',
})
export class CardDatabaseComponent implements AfterViewInit {
  private intervalId: number | undefined;
  private readonly timeoutIds: number[] = [];

  private readonly platform = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platform);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly righe = Array.from({ length: 5 });
  protected readonly colonne = Array.from({ length: 5 });
  protected readonly celleEvidenziate = signal<ReadonlySet<number>>(new Set());

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const numeroCelle = this.righe.length * this.colonne.length;

    this.intervalId = window.setInterval(() => {
      const numeri = new Array(Math.floor(Math.random() * (numeroCelle / 4)))
        .fill(0)
        .map(() => Math.floor(Math.random() * numeroCelle));

      numeri.forEach((numero, i) => {
        if (this.celleEvidenziate().has(numero)) return;

        const delay = i * 200;
        this.timeoutIds.push(
          window.setTimeout(() => {
            this.celleEvidenziate.update((celle) => new Set(celle).add(numero));
          }, delay)
        );
        this.timeoutIds.push(
          window.setTimeout(() => {
            this.celleEvidenziate.update((celle) => {
              const prossime = new Set(celle);
              prossime.delete(numero);
              return prossime;
            });
          }, 500 + delay)
        );
      });
    }, 750);

    this.destroyRef.onDestroy(() => this.pulisciTimer());
  }

  private pulisciTimer(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }

    this.timeoutIds.forEach((id) => window.clearTimeout(id));
    this.timeoutIds.length = 0;
  }
}
