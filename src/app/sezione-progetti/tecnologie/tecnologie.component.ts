import { DOCUMENT } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Progetto } from '../dati';

@Component({
    selector: 'Tecnologie',
    imports: [],
    templateUrl: './tecnologie.component.html',
    styleUrl: './tecnologie.component.scss'
})
export class TecnologieComponent {
  private readonly window = inject(DOCUMENT).defaultView;

  readonly progettoSelezionato = input.required<Progetto>({
    alias: 'progetto-selezionato',
  });

  readonly progettoPrecedente = input<Progetto | undefined>(undefined, {
    alias: 'progetto-precedente',
  });

  ApriLink(link: string) {
    this.window?.open(link, '_blank');
  }
}
