import { Service, signal } from '@angular/core';

@Service()
export class ProgettiService {
  private richiestaId = 0;
  private readonly richiestaProgetto = signal<RichiestaProgetto | undefined>(
    undefined
  );

  readonly progettoRichiesto = this.richiestaProgetto.asReadonly();

  richiediProgetto(nome: string): void {
    this.richiestaProgetto.set({ nome, id: ++this.richiestaId });
  }
}

type RichiestaProgetto = {
  nome: string;
  id: number;
};
