import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  NgZone,
  inject,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'CardDatabase',
  imports: [],
  templateUrl: './card-database.component.html',
  styleUrl: './card-database.component.scss',
})
export class CardDatabaseComponent implements AfterViewInit, OnDestroy {
  div = new Array(5);

  @ViewChild('tbody')
  tbody!: ElementRef<HTMLElement>;

  private intervalId: number | undefined;

  private readonly zone = inject(NgZone);
  private readonly platform = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platform);

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const NOME_CLASSE = 'hl';
    const cont = this.tbody.nativeElement;
    const celle = Array.from(cont.querySelectorAll('td'));

    this.zone.runOutsideAngular(() => {
      this.intervalId = window.setInterval(() => {
        const numeri = new Array(Math.floor(Math.random() * (celle.length / 4)))
          .fill(0)
          .map(() => Math.floor(Math.random() * celle.length));

        numeri.forEach((numero, i) => {
          const td = celle[numero];
          if (td.classList.contains(NOME_CLASSE)) return;

          const delay = i * 200;
          td.classList.add(NOME_CLASSE);
          window.setTimeout(() => td.classList.add(NOME_CLASSE), delay);
          window.setTimeout(
            () => td.classList.remove(NOME_CLASSE),
            500 + delay
          );
        });
      }, 750);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}
