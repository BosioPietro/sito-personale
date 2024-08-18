import { Component, Input } from '@angular/core';
import { Progetto } from '../dati';

@Component({
  selector: 'Tecnologie',
  standalone: true,
  imports: [],
  templateUrl: './tecnologie.component.html',
  styleUrl: './tecnologie.component.scss'
})
export class TecnologieComponent {

  @Input("progetto-selezionato")
  progettoSelezionato!: Progetto;

  @Input("progetto-precedente")
  progettoPrecedente?: Progetto;

  @Input("resetta-for")
  resettaFor!: boolean;

  ApriLink(link: string){
    window.open(link, "_blank");
  }
}
