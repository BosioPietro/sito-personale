import {
  Component,
  input,
  output,
} from '@angular/core';
import { IconaComponent } from '../../common/icona/icona.component';

@Component({
  selector: 'Switch',
  imports: [IconaComponent],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  host: {
    '[attr.sezione-corrente]': 'sezioneCorrente()',
  },
})
export class SwitchComponent {
  readonly sezioneCorrente = input(Sezioni.Web, { alias: 'sezione-corrente' });
  readonly changed = output<Sezioni>();

  protected readonly sezioni = Sezioni;

  Seleziona(sezione: Sezioni) {
    if (this.sezioneCorrente() === sezione) return;

    this.changed.emit(sezione);
  }
}

export enum Sezioni {
  Web,
  Certificazioni,
  Sviluppo,
}
