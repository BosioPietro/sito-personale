import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  input,
  output,
} from '@angular/core';
import { IconaComponent } from '../../common/icona/icona.component';

@Component({
  selector: 'Switch',
  imports: [IconaComponent],
  templateUrl: './switch.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './switch.component.scss',
})
export class SwitchComponent {
  readonly sezioneCorrente = input(Sezioni.Web, { alias: 'sezione-corrente' });
  readonly changed = output<Sezioni>();

  protected readonly sezioni = Sezioni;

  @HostBinding('attr.sezione-corrente')
  get sezioneCorrenteAttr(): string {
    return this.sezioneCorrente().toString();
  }

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
