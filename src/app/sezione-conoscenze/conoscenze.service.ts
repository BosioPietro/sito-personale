import { Service, signal } from '@angular/core';
import { Sezioni } from './switch/switch.component';

@Service()
export class ConoscenzeService {
  private readonly sezioneCorrente = signal(Sezioni.Web);

  readonly sezione = this.sezioneCorrente.asReadonly();
  
  cambiaSezione(sezione: Sezioni) {
    this.sezioneCorrente.set(sezione);
  }
}
