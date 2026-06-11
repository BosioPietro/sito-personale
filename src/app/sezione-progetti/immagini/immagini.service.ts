import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImmaginiService {
  private readonly immaginePrecedenteCorrente = signal<number | undefined>(
    undefined
  );
  private readonly immagineCorrente = signal(0);

  readonly immaginePrecedente = this.immaginePrecedenteCorrente.asReadonly();
  readonly immagineSelezionata = this.immagineCorrente.asReadonly();

  selezionaImmagine(immagine: number): void {
    this.immagineCorrente.set(immagine);
  }

  conservaImmagineCorrenteComePrecedente(): void {
    this.immaginePrecedenteCorrente.set(this.immagineCorrente());
  }

  resettaImmaginePrecedente(): void {
    this.immaginePrecedenteCorrente.set(undefined);
  }
}
