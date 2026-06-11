import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { Progetto } from '../dati';
import { ProgettiService } from './progetti.service';
import { IconaComponent } from '../../common/icona/icona.component';

@Component({
  selector: 'SelettoreProgetti',
  imports: [IconaComponent],
  templateUrl: './selettore-progetti.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './selettore-progetti.component.scss',
})
export class SelettoreProgettiComponent implements AfterViewInit {
  constructor(private valore_progetto: ProgettiService) {}

  @ViewChild('selettore')
  selettore!: ElementRef<HTMLElement>;

  readonly progetti = input.required<Progetto[]>({ alias: 'progetti' });

  readonly progettoSelezionato = input.required<Progetto>({
    alias: 'progetto-selezionato',
  });

  readonly puoCambiare = input.required<boolean>({ alias: 'puo-cambiare' });

  readonly selected = output<Progetto>();

  ngAfterViewInit(): void {
    const cont = this.selettore.nativeElement.parentElement!;
    const bottoni = Array.from<HTMLElement>(cont.querySelectorAll('.progetto'));

    bottoni.forEach((b) => {
      this.valore_progetto.bottoni[b.getAttribute('nome')!] = b;
    });
  }

  Seleziona(p: Progetto) {
    if (this.progettoSelezionato() === p || !this.puoCambiare()) return;
    this.selected.emit(p);
  }
}
