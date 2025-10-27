import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Progetto } from '../dati';
import { ProgettiService } from './progetti.service';
import { IconaComponent } from '../../common/icona/icona.component';

@Component({
  selector: 'SelettoreProgetti',
  imports: [IconaComponent],
  templateUrl: './selettore-progetti.component.html',
  styleUrl: './selettore-progetti.component.scss',
})
export class SelettoreProgettiComponent implements AfterViewInit {
  constructor(private valore_progetto: ProgettiService) {}

  @ViewChild('selettore')
  selettore!: ElementRef<HTMLElement>;

  @Input('progetti')
  progetti!: Progetto[];

  @Input('progetto-selezionato')
  progettoSelezionato!: Progetto;

  @Input('puo-cambiare')
  puoCambiare!: boolean;

  @Output()
  onSelect = new EventEmitter<Progetto>();

  ngAfterViewInit(): void {
    const cont = this.selettore.nativeElement.parentElement!;
    const bottoni = Array.from<HTMLElement>(cont.querySelectorAll('.progetto'));

    bottoni.forEach((b) => {
      this.valore_progetto.bottoni[b.getAttribute('nome')!] = b;
    });
  }

  Seleziona(p: Progetto) {
    if (this.progettoSelezionato === p || !this.puoCambiare) return;
    this.onSelect.emit(p);
  }
}
