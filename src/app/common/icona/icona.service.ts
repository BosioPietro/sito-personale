import { inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type IconaResult = SafeHtml | null;
export type IconaRequest = Promise<IconaResult> | IconaResult;

@Injectable({
  providedIn: 'root',
})
export class IconaService {
  private readonly icone: Map<string, IconaRequest> = new Map();
  private readonly sanitizer = inject(DomSanitizer);

  FetchIcona(nome: string): IconaRequest {
    if (this.icone.has(nome)) return this.icone.get(nome)!;

    const richiesta = this.RichiediIcona(nome);
    this.icone.set(nome, richiesta);

    return richiesta;
  }

  RichiediIcona(nome: string): Promise<IconaResult> {
    return new Promise<IconaResult>((resolve) => {
      const url = new URL(`assets/icone/${nome}.svg`, document.baseURI).href;
      fetch(url)
        .then((res) => res.text())
        .then((svg) => {
          if (svg.includes('Cannot')) throw new Error('Icon not found');
          resolve(this.sanitizer.bypassSecurityTrustHtml(svg));
        })
        .catch(() => {
          resolve(null);
        });
    });
  }
}
