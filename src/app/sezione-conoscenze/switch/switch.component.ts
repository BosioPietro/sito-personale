import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { IconaComponent } from '../../common/icona/icona.component';

@Component({
  selector: 'Switch',
  imports: [IconaComponent],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class SwitchComponent {
  @Output()
  onChange = new EventEmitter<Sezioni>();

  protected readonly sezioni = Sezioni;
  protected sezioneCorrente: Sezioni = Sezioni.Web;
  private readonly ref: ElementRef<HTMLElement> = inject(
    ElementRef<HTMLElement>
  );

  constructor() {
    this.ref.nativeElement.setAttribute(
      'sezione-corrente',
      this.sezioneCorrente.toString()
    );
  }

  Seleziona(sezione: Sezioni) {
    if (this.sezioneCorrente === sezione) return;

    this.ref.nativeElement.setAttribute('sezione-corrente', sezione.toString());
    this.sezioneCorrente = sezione;
    this.onChange.emit(sezione);
  }
}

export enum Sezioni {
  Web,
  Certificazioni,
  Sviluppo,
}
