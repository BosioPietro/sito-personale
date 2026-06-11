import { Component, computed, input } from '@angular/core';
import { Progetto } from '../dati';

@Component({
    selector: 'Descrizione',
    imports: [],
    templateUrl: './descrizione.component.html',
    styleUrl: './descrizione.component.scss'
})
export class DescrizioneComponent {

  readonly progettoSelezionato = input.required<Progetto>({
    alias: 'progetto-selezionato',
  });

  readonly progettoPrecedente = input<Progetto | undefined>(undefined, {
    alias: 'progetto-precedente',
  });

  protected readonly descrizioneCorrente = computed(() =>
    creaDescrizione(this.progettoSelezionato())
  );

  protected readonly descrizionePrecedente = computed(() => {
    const progetto = this.progettoPrecedente();
    return progetto ? creaDescrizione(progetto) : undefined;
  });
}

type SegmentoTesto =
  | {
      tipo: 'testo' | 'gradient' | 'codice';
      valore: string;
    }
  | {
      tipo: 'link';
      valore: string;
      href: string;
    };

type DescrizioneProgetto = {
  introduzione: SegmentoTesto[][];
  funzionalita: {
    titolo: string;
    testo: SegmentoTesto[][];
  }[];
};

function creaDescrizione(progetto: Progetto): DescrizioneProgetto {
  return {
    introduzione: progetto.introduzione.map(creaSegmentiTesto),
    funzionalita: progetto.funzionalita.map((funzionalita) => ({
      titolo: funzionalita.titolo,
      testo: funzionalita.testo.map(creaSegmentiTesto),
    })),
  };
}

function creaSegmentiTesto(testo: string): SegmentoTesto[] {
  const segmenti: SegmentoTesto[] = [];
  const token = /([|#§])(.+?)\1/g;
  let indice = 0;
  let corrispondenza: RegExpExecArray | null;

  while ((corrispondenza = token.exec(testo))) {
    if (corrispondenza.index > indice) {
      segmenti.push({
        tipo: 'testo',
        valore: decodificaEntita(testo.slice(indice, corrispondenza.index)),
      });
    }

    const [, delimitatore, valore] = corrispondenza;
    const contenuto = decodificaEntita(valore);

    if (delimitatore === '|') {
      segmenti.push({ tipo: 'gradient', valore: contenuto });
    } else if (delimitatore === '#') {
      segmenti.push({ tipo: 'codice', valore: contenuto });
    } else {
      segmenti.push({
        tipo: 'link',
        valore: contenuto.replace(/^https?:\/\//, ''),
        href: contenuto,
      });
    }

    indice = token.lastIndex;
  }

  if (indice < testo.length) {
    segmenti.push({
      tipo: 'testo',
      valore: decodificaEntita(testo.slice(indice)),
    });
  }

  return segmenti;
}

function decodificaEntita(testo: string): string {
  return testo
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&');
}
