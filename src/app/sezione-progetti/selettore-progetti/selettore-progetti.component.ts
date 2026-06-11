import { Component, input, output } from '@angular/core';
import { Progetto } from '../dati';
import { IconaComponent } from '../../common/icona/icona.component';

@Component({
  selector: 'SelettoreProgetti',
  imports: [IconaComponent],
  templateUrl: './selettore-progetti.component.html',
  styleUrl: './selettore-progetti.component.scss',
})
export class SelettoreProgettiComponent {
  readonly progetti = input.required<Progetto[]>({ alias: 'progetti' });

  readonly progettoSelezionato = input.required<Progetto>({
    alias: 'progetto-selezionato',
  });

  readonly puoCambiare = input.required<boolean>({ alias: 'puo-cambiare' });

  readonly selected = output<Progetto>();

  Seleziona(p: Progetto) {
    if (this.progettoSelezionato() === p || !this.puoCambiare()) return;
    this.selected.emit(p);
  }
}
