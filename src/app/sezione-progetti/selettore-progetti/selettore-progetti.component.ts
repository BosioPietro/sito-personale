import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { Progetto } from '../dati';

@Component({
  selector: 'SelettoreProgetti',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './selettore-progetti.component.html',
  styleUrl: './selettore-progetti.component.scss'
})
export class SelettoreProgettiComponent{
  @Input("progetti")
  progetti!: Progetto[];

  @Input("progetto-selezionato")
  progettoSelezionato!: Progetto;

  @Input("puo-cambiare")
  puoCambiare!: boolean;

  @Output()
  onSelect = new EventEmitter<Progetto>();

  Seleziona(p: Progetto){
    if(this.progettoSelezionato === p || !this.puoCambiare) return;
    this.onSelect.emit(p);
  }

}
