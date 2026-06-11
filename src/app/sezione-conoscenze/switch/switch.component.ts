import {
  Component,
  ElementRef,
  inject,
  ChangeDetectionStrategy,
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
  readonly changed = output<Sezioni>();

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
    this.changed.emit(sezione);
  }
}

export enum Sezioni {
  Web,
  Certificazioni,
  Sviluppo,
}
