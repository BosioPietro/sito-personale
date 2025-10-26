import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  NgZone,
} from '@angular/core';

@Component({
  selector: 'CardDatabase',
  standalone: true,
  imports: [],
  templateUrl: './card-database.component.html',
  styleUrl: './card-database.component.scss',
})
export class CardDatabaseComponent implements AfterViewInit, OnDestroy {
  div = new Array(5);

  @ViewChild('tbody')
  tbody!: ElementRef<HTMLElement>;

  private intervalId: number | undefined;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    const NOME_CLASSE = 'hl';
    const cont = this.tbody.nativeElement;
    const celle = Array.from(cont.querySelectorAll('td'));

    this.zone.runOutsideAngular(() => {
      this.intervalId = window.setInterval(() => {
        const numero = Math.floor(Math.random() * celle.length);
        const td = celle[numero];

        if (td.classList.contains(NOME_CLASSE)) return;

        td.classList.add(NOME_CLASSE);
        window.setTimeout(() => td.classList.remove(NOME_CLASSE), 500);
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
