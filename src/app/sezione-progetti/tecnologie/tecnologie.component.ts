import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Progetto } from '../dati';

@Component({
    selector: 'Tecnologie',
    imports: [],
    templateUrl: './tecnologie.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './tecnologie.component.scss'
})
export class TecnologieComponent {

  readonly progettoSelezionato = input.required<Progetto>({
    alias: 'progetto-selezionato',
  });

  readonly progettoPrecedente = input<Progetto | undefined>(undefined, {
    alias: 'progetto-precedente',
  });

  readonly resettaFor = input.required<boolean>({ alias: 'resetta-for' });

  ApriLink(link: string){
    window.open(link, "_blank");
  }
}
