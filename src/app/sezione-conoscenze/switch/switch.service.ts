import { Injectable } from '@angular/core';
import { Sezioni } from './switch.component';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  bottoni : Record<Sezioni, HTMLElement | undefined> = {
    [Sezioni.Web] : undefined,
    [Sezioni.Certificazioni]: undefined,
    [Sezioni.Sviluppo]: undefined
  }
}
