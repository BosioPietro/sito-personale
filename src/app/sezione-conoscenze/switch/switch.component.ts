import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { SwitchService } from './switch.service';
import { IconaComponent } from '../../common/icona/icona.component';

@Component({
  selector: 'Switch',
  imports: [IconaComponent],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class SwitchComponent implements AfterViewInit {
  @ViewChild('web')
  opzione_web!: ElementRef<HTMLElement>;

  @ViewChild('sviluppo')
  opzione_sviluppo!: ElementRef<HTMLElement>;

  @ViewChild('certificazioni')
  opzione_certificazioni!: ElementRef<HTMLElement>;

  @ViewChild('cella')
  cella!: ElementRef<HTMLElement>;

  @Output()
  onChange = new EventEmitter<Sezioni>();

  constructor(private valore_switch: SwitchService) {}

  sezioni = Sezioni;
  sezioneCorrente?: Sezioni;

  async Seleziona(e: Event | HTMLElement, sezione: Sezioni) {
    const el = e instanceof Event ? (e.currentTarget! as HTMLElement) : e;
    const cella = this.cella.nativeElement;

    // Tiene conto della width iniziale della cella
    this.ImpostaWidthCella(cella);
    Object.assign(cella, { bottone: el });

    const w = getComputedStyle(el).width;
    const sinistra = el.offsetLeft;

    cella.style.width = w;
    cella.style.left = `${sinistra}px`;

    el.parentNode!.childNodes.forEach((b) => {
      (b as HTMLElement).classList.remove('selezionato', 'anima');
    });

    el.classList.add('selezionato', 'anima');

    if (this.sezioneCorrente === sezione) return;

    this.sezioneCorrente = sezione;
    this.onChange.emit(sezione);
  }

  ImpostaWidthCella(cella: any) {
    const bottone =
      (cella.bottone as HTMLElement) || this.opzione_web.nativeElement;
    const w = getComputedStyle(bottone).width;
    const sinistra = bottone.offsetLeft;

    cella.classList.add('no-transizione');
    cella.style.width = w;
    cella.style.left = `${sinistra}px`;
    cella.classList.remove('no-transizione');
  }

  ngAfterViewInit(): void {
    this.valore_switch.bottoni = {
      [Sezioni.Web]: this.opzione_web.nativeElement,
      [Sezioni.Sviluppo]: this.opzione_sviluppo.nativeElement,
      [Sezioni.Certificazioni]: this.opzione_certificazioni.nativeElement,
    };
  }
}

export enum Sezioni {
  Web,
  Certificazioni,
  Sviluppo,
}
